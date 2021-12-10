using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using GestioneAlunni.Models;
using Microsoft.CodeAnalysis;
using System.Reflection.Metadata;

namespace GestioneAlunni.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClassiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ClassiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

		//funzione get per ottenere la lista delle classi dal dbo
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Classi";
            DataTable dataTable = new DataTable();
            string sqlConnectionString = _configuration.GetConnectionString("GestioneAlunniConnection");
            SqlDataReader MyDataReader;
            using(SqlConnection MyConn = new SqlConnection(sqlConnectionString))
            {
                MyConn.Open();

                using (SqlCommand MyCommand = new SqlCommand(query, MyConn))
                {
                    MyDataReader = MyCommand.ExecuteReader();

                    dataTable.Load(MyDataReader);

                    MyDataReader.Close();
                    MyConn.Close();
                }
            }

            return new JsonResult(dataTable);
        }

		//funzione post per aggiungere una classe al db nella tabella classi
        [HttpPost]
        public JsonResult Post(Classi c)
        {
            string query = @"insert into dbo.Classi values ('"+c.NomeClasse+@"')";
            DataTable dataTable = new DataTable();
            string sqlConnectionString = _configuration.GetConnectionString("GestioneAlunniConnection");
            SqlDataReader MyDataReader;
            using (SqlConnection MyConn = new SqlConnection(sqlConnectionString))
            {
                MyConn.Open();

                using (SqlCommand MyCommand = new SqlCommand(query, MyConn))
                {
                    MyDataReader = MyCommand.ExecuteReader();

                    dataTable.Load(MyDataReader);

                    MyDataReader.Close();
                    MyConn.Close();
                }
            }

            return new JsonResult("Add Success");
        }

    }
}
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

namespace GestioneAlunni.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StudentiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StudentiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

		//funzione get per ottenere una lista degli studenti utilizzando la classe scelta nel come condizone where
        [HttpGet("{s}")]
        public JsonResult Get(string s)
        {
            string query = @"select * from dbo.Studenti where Classe = '" + s + @"'";
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

            return new JsonResult(dataTable);
        }


		//funzione post per aggiungere uno studente al db nella tabella studenti
        [HttpPost]
        public JsonResult Post(Studenti stud)
        {
            string query = @"insert into dbo.Studenti values ('" + stud.Nome + @"',
                                                              '" + stud.Cognome + @"',
                                                              '" + stud.DataDiNascita + @"',
                                                              '" + stud.Classe + @"')";
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

		//funzione per modificare uno studente nella tabella studenti
        [HttpPut]
        public JsonResult Put(Studenti stud)
        {
            string query = @"update dbo.Studenti set Nome = '" + stud.Nome+ @"',
                                                     Cognome = '" + stud.Cognome + @"',
                                                     DataDiNascita = '" + stud.DataDiNascita + @"',
                                                     Classe = '" + stud.Classe + @"'
                             where StudenteID = '" + stud.StudenteID + @"'";
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

            return new JsonResult("Update Success");
        }

		//funzione per eliminare uno studente dalla tabella studenti utilizzando l'ID dello studente come condizone nel where
        [HttpDelete("{s}")]
        public JsonResult Delete(string s)
        {
            string query = @"delete from dbo.Studenti where StudenteID = '" + s + @"'";
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

            return new JsonResult("Delete Success");
        }
    }
}
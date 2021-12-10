using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestioneAlunni.Models
{
	//classe per definire la tabella Studenti
    public class Studenti
    {
        public int StudenteID { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public DateTime DataDiNascita { get; set; }

        public string Classe { get; set; }
    }
}

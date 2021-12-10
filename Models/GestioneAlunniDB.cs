using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestioneAlunni.Models
{
	
	//classe per definire il database con EF core
    public class GestioneAlunniDB : DbContext
    {
        public GestioneAlunniDB(DbContextOptions<GestioneAlunniDB> options) : base(options)
        {

        }

        public DbSet<Classi> Classi { get; set; }
        public DbSet<Studenti> Studenti { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Classi>().ToTable("Classi");
            modelBuilder.Entity<Studenti>().ToTable("Studenti");
        }
    }
}

using Microsoft.EntityFrameworkCore;
using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Infrastracture.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base() { }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        internal DbSet<Form> Forms { get; set; }
        internal DbSet<Field> Fields{get; set;}
        internal DbSet<FieldOption> FieldOptions {get; set;}
        internal DbSet<FormResponse> FormResponses {get; set;}
        internal DbSet<FieldResponse> FieldsResponses {get; set;}
        internal DbSet<FieldResponseOption> FieldResponseOptions {get; set;}
    }
}

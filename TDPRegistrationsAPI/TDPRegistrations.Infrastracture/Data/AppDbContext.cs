using Microsoft.EntityFrameworkCore;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Infrastracture.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base() { }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Form> Forms { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<FieldOption> FieldOptions { get; set; }
        public DbSet<FormResponse> FormResponses { get; set; }
        public DbSet<FieldResponse> FieldsResponses { get; set; }
        public DbSet<FieldResponseOption> FieldResponseOptions { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}

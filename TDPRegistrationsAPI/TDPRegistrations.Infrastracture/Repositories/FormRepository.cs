using Microsoft.EntityFrameworkCore;
using System.Threading;
using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Core.Models;
using TDPRegistrations.Infrastracture.Data;

namespace TDPRegistrations.Infrastracture.Repositories
{
    public class FormRepository : IFormRepository
    {
        private readonly AppDbContext _appDbContext;

        public FormRepository(AppDbContext dbContext)
        {
            _appDbContext = dbContext;
        }

        public async Task<Form> Create(Form model, CancellationToken cancellationToken)
        {
            await _appDbContext.Forms.AddAsync(model);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return model;
        }

        public async Task Delete(Form model, CancellationToken cancellationToken)
        {
            _appDbContext.Forms.Remove(model);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _appDbContext.Forms
                    .Select(f => new FormLight
                    {
                        Id = f.Id,
                        Title = f.Title,
                        DateCreated = f.DateCreated

                    })
                    .OrderByDescending(f => f.DateCreated)
                    .ToListAsync(cancellationToken);
        }

        public async Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var result = await _appDbContext.Forms.FirstOrDefaultAsync(f => f.Id == id);
            return result;
        }

        public async Task Update(Form model, CancellationToken cancellationToken)
        {
            _appDbContext.Forms.Update(model);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }
    }
}

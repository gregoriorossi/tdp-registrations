using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
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

        public async Task<Form> CreateAsync(Form model, CancellationToken cancellationToken)
        {
            await _appDbContext.Forms.AddAsync(model);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return model;
        }

        public async Task DeleteAsync(Form model, CancellationToken cancellationToken)
        {
            _appDbContext.Forms.Remove(model);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<IEnumerable<Form>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _appDbContext.Forms
                    .ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<Form>> GetAllAsync(Expression<Func<Form, bool>> where, CancellationToken cancellationToken)
        {
            return await _appDbContext.Forms
                    .Include(f => f.Fields)
                    .Where(where)
                    .ToListAsync(cancellationToken);
        }

        public async Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var result = await _appDbContext.Forms.FirstOrDefaultAsync(f => f.Id == id);
            return result;
        }

        public async Task<IEnumerable<Field>> GetFieldsAsync(Guid formId, CancellationToken cancellationToken)
        {
            var result = await _appDbContext.Fields
                .Where(f => f.Id == formId)
                .ToListAsync();
            return result;
        }

        public async Task UpdateAsync(Form model, CancellationToken cancellationToken)
        {
            _appDbContext.Forms.Update(model);
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task SaveChangeAsync(CancellationToken cancellationToken)
        {
            await _appDbContext.SaveChangesAsync(cancellationToken);
        }
    }
}

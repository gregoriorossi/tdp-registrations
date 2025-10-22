using TDPRegistrations.Core.Interfaces;
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

        public Task<Form> Create(Form model)
        {
            throw new NotImplementedException();
        }

        public Task Delete(Form model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Form>> GetAllAsync()
        {
            // solo i campi di base
            //return _appDbContext.Forms
            //        .Select(f => f.)
            throw new NotImplementedException();
        }

        public Task<Form> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task SaveChange(Form model)
        {
            throw new NotImplementedException();
        }

        public Task Update(Form model)
        {
            throw new NotImplementedException();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Infrastracture.Data;

namespace TDPRegistrations.Infrastracture.Repositories
{
    public class FilesRepository : IFilesRepository
    {
        private readonly AppDbContext _appDbContext;

        public FilesRepository(AppDbContext dbContext)
        {
            _appDbContext = dbContext;   
        }

        public async Task<IEnumerable<Core.Entities.File>> GetAllAsync(Expression<Func<Core.Entities.File, bool>> where, CancellationToken cancellationToken)
        {
            return await _appDbContext.Images.Where(where).ToListAsync();
        }
    }
}

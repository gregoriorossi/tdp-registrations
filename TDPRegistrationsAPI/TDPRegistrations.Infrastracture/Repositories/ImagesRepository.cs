using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Infrastracture.Data;

namespace TDPRegistrations.Infrastracture.Repositories
{
    public class ImagesRepository : IImagesRepository
    {
        private readonly AppDbContext _appDbContext;

        public ImagesRepository(AppDbContext dbContext)
        {
            _appDbContext = dbContext;   
        }

        public async Task<IEnumerable<Image>> GetAllAsync(Expression<Func<Image, bool>> where, CancellationToken cancellationToken)
        {
            return await _appDbContext.Images.Where(where).ToListAsync();
        }
    }
}

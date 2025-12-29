using Microsoft.EntityFrameworkCore;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Infrastracture.Data;

namespace TDPRegistrations.Infrastracture.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly AppDbContext _appDbContext;

        public UsersRepository(AppDbContext appDbContext) {
            _appDbContext = appDbContext;
        }
        
        public async Task<User?> Get(string username, CancellationToken cancellationToken)
        {
            return await _appDbContext.Users
                .Where(u => u.Username.ToLower() == username.ToLower())
                .AsNoTracking()
                .FirstOrDefaultAsync();
        }
    }
}

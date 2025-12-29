using TDPRegistrations.Core.Entities;

namespace TDPRegistrations.Core.Interfaces.Repositories
{
    public interface IUsersRepository
    {
        Task<User?> Get(string username, CancellationToken cancellationToken);
    }
}

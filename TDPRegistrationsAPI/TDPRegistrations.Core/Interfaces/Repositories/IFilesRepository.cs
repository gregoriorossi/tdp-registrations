using System.Linq.Expressions;
using TDPRegistrations.Core.Entities;

namespace TDPRegistrations.Core.Interfaces.Repositories
{
    public interface IFilesRepository
    {
        Task<IEnumerable<Entities.File>> GetAllAsync(Expression<Func<Entities.File, bool>> where, CancellationToken cancellationToken);
    }
}

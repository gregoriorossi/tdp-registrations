using System.Linq.Expressions;
using TDPRegistrations.Core.Entities;

namespace TDPRegistrations.Core.Interfaces.Repositories
{
    public interface IImagesRepository
    {
        Task<IEnumerable<Image>> GetAllAsync(Expression<Func<Image, bool>> where, CancellationToken cancellationToken);
    }
}

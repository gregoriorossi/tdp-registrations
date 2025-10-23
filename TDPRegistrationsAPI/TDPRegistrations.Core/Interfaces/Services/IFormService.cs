using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces.Services
{
    public interface IFormService
    {
        Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken);
        Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }
}

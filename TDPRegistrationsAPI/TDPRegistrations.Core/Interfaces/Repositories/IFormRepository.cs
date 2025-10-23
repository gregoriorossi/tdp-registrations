using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces.Repositories
{
    public interface IFormRepository
    {
        Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken);
        Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Form> Create(Form model, CancellationToken cancellationToken);
        Task Update(Form model, CancellationToken cancellationToken);
        Task Delete(Form model, CancellationToken cancellationToken);
    }
}

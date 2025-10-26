using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces.Repositories
{
    public interface IFormRepository
    {
        Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken);
        Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Form> CreateAsync(Form model, CancellationToken cancellationToken);
        Task UpdateAsync(Form model, CancellationToken cancellationToken);
        Task DeleteAsync(Form model, CancellationToken cancellationToken);
        Task<IEnumerable<Field>> GetFieldsAsync(Guid formId, CancellationToken cancellationToken);
        Task SaveChangeAsync(CancellationToken cancellationToken);
    }
}

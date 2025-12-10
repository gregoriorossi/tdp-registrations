using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces.Managers
{
    public interface IFormManager
    {
        Task<IEnumerable<Form>> GetAllAsync(CancellationToken cancellationToken);

        Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<Form?> GetBySlugAsync(string slug, CancellationToken cancellationToken);

        Task<bool> FormExists(Guid id, CancellationToken cancellationToken);

        Task<bool> IsSlugAvailableAsync(Form form, CancellationToken cancellationToken);

        Task<Form> CreateAsync(Form form, CancellationToken cancellationToken);

        Task DeleteAsync(Form form, CancellationToken cancellationToken);

        Task<Form> UpdateAsync(Form form, CancellationToken cancellationToken);

        Task<IEnumerable<Field>> GetFieldsAsync(Guid formId, CancellationToken cancellationToken);

        Task SetRegistrationsStatus(Guid formId, bool status, CancellationToken cancellationToken);
    }
}

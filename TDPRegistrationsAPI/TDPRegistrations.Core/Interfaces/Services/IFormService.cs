using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces.Services
{
    public interface IFormService
    {
        Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken);

        Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<bool> FormExists(Guid id, CancellationToken cancellationToken);

        Task<bool> IsSlugAvailableAsync(Form form, CancellationToken cancellationToken);

        Task<Form> CreateAsync(Form form, CancellationToken cancellationToken);

        Task<Form> UpdateAsync(Form form, CancellationToken cancellationToken);

        Task<Field> AddFieldAsync(Field field, Guid formId, CancellationToken cancellationToken);
        
        Task<IEnumerable<Field>> GetFieldsAsync(Guid formId, CancellationToken cancellationToken);
    }
}

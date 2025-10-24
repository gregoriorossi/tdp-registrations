using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces.Services
{
    public interface IFormService
    {
        Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken);

        Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<bool> IsSlugAvailable(Form form, CancellationToken cancellationToken);

        Task<Form> Create(Form form, CancellationToken cancellationToken);

        Task<Form> Update(Form form, CancellationToken cancellationToken);

        Task<Field> AddField(Field field, Guid formId, CancellationToken cancellationToken);
    }
}

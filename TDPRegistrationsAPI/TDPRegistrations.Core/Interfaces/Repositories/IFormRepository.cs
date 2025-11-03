using System.Linq.Expressions;
using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces.Repositories
{
    public interface IFormRepository
    {
        Task<IEnumerable<Form>> GetAllAsync(CancellationToken cancellationToken);

        Task<IEnumerable<Form>> GetAllAsync(Expression<Func<Form, bool>> where, CancellationToken cancellationToken);

        Task<Form> CreateAsync(Form model, CancellationToken cancellationToken);
        
        Task UpdateAsync(Form model, CancellationToken cancellationToken);
        
        Task DeleteAsync(Form model, CancellationToken cancellationToken);
        
        Task<IEnumerable<Field>> GetFieldsAsync(Guid formId, CancellationToken cancellationToken);
        
        Task SaveChangeAsync(CancellationToken cancellationToken);
    }
}

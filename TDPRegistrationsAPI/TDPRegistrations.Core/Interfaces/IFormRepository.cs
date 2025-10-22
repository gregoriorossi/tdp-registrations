using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Interfaces
{
    public interface IFormRepository
    {
        Task<IEnumerable<Form>> GetAllAsync();
        Task<Form> GetByIdAsync(Guid id);
        Task<Form> Create(Form model);
        Task Update(Form model);
        Task Delete(Form model);
        Task SaveChange(Form model);
    }
}

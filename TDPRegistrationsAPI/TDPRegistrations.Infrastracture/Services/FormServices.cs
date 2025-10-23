using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Core.Interfaces.Services;
using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Infrastracture.Services
{
    public class FormServices : IFormService
    {
        private IFormRepository _formRepository;

        public FormServices(IFormRepository formRepository)
        {
            _formRepository = formRepository;
        }

        public async Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _formRepository.GetAllAsync(cancellationToken);
        }

        public async Task<Form?>  GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _formRepository.GetByIdAsync(id, cancellationToken);
        }
    }
}

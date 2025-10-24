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

        public async Task<Form> Create(Form form, CancellationToken cancellationToken)
        {
            var result = await _formRepository.Create(form, cancellationToken);
            return result;
        }

        public async Task<IEnumerable<FormLight>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _formRepository.GetAllAsync(cancellationToken);
        }

        public async Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _formRepository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<bool> IsSlugAvailable(Form form, CancellationToken cancellationToken)
        {
            var forms = await _formRepository.GetAllAsync(cancellationToken);
            bool slugExists = forms.Any(f => f.Slug == form.Slug && f.Id != form.Id);
            return !slugExists;
        }

        public async Task<Form> Update(Form form, CancellationToken cancellationToken)
        {
            await _formRepository.Update(form, cancellationToken);
            return form;
        }


        public Task<Field> AddField(Field field, Guid formId, CancellationToken cancellationToken)
        {
            // calcolare l'ordine del campo
            throw new NotImplementedException();
        }
    }
}

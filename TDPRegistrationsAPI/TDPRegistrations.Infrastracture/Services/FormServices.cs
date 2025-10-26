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

        public async Task<Form> CreateAsync(Form form, CancellationToken cancellationToken)
        {
            var result = await _formRepository.CreateAsync(form, cancellationToken);
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

        public async Task<bool> IsSlugAvailableAsync(Form form, CancellationToken cancellationToken)
        {
            var forms = await _formRepository.GetAllAsync(cancellationToken);
            bool slugExists = forms.Any(f => f.Slug == form.Slug && f.Id != form.Id);
            return !slugExists;
        }

        public async Task<Form> UpdateAsync(Form form, CancellationToken cancellationToken)
        {
            await _formRepository.UpdateAsync(form, cancellationToken);
            return form;
        }

        public async Task<Field> AddFieldAsync(Field field, Guid formId, CancellationToken cancellationToken)
        {
            var formFields = await GetFieldsAsync(formId, cancellationToken);
            var lastFormField = formFields.OrderByDescending(f => f.Order).FirstOrDefault();

            int order = lastFormField == null ? 1 : lastFormField.Order + 1;
            field.Order = order;

            Form form = await _formRepository.GetByIdAsync(formId, cancellationToken);
            form.Fields.Add(field);

            await _formRepository.SaveChangeAsync(cancellationToken);

            return field;
        }

        public async Task<IEnumerable<Field>> GetFieldsAsync(Guid formId, CancellationToken cancellationToken)
        {
            var fields = await _formRepository.GetFieldsAsync(formId, cancellationToken);
            return fields;
        }

        public async Task<bool> FormExists(Guid id, CancellationToken cancellationToken)
        {
            Form? result = await _formRepository.GetByIdAsync(id, cancellationToken);
            return result != null;
        }
    }
}

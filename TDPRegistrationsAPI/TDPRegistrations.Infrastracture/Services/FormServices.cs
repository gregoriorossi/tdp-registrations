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

        public async Task<IEnumerable<Form>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _formRepository.GetAllAsync(cancellationToken);
        }

        public async Task<Form?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
        {
            System.Linq.Expressions.Expression<Func<Form, bool>> whereFn = (Form f) => slug == f.Slug;
            var forms = await _formRepository.GetAllAsync(whereFn, cancellationToken);
            return forms.FirstOrDefault();
        }

        public async Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            System.Linq.Expressions.Expression<Func<Form, bool>> whereFn = (Form f) => id == f.Id;
            var forms = await _formRepository.GetAllAsync(whereFn, cancellationToken);
            return forms.FirstOrDefault();
        }

        public async Task<bool> IsSlugAvailableAsync(Form form, CancellationToken cancellationToken)
        {
            var result = await GetBySlugAsync(form.Slug, cancellationToken);
            bool slugExists = result != null;
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

            Form form = await GetByIdAsync(formId, cancellationToken);
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
            Form? result = await GetByIdAsync(id, cancellationToken);
            return result != null;
        }
    }
}
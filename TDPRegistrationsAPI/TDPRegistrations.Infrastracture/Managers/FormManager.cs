using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Infrastracture.Managers
{
    public class FormManager : IFormManager
    {
        private IFormRepository _formRepository;

        public FormManager(IFormRepository formRepository)
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
            System.Linq.Expressions.Expression<Func<Form, bool>> whereFn = (f) => slug.ToLower() == f.Slug.ToLower();
            var forms = await _formRepository.GetAllAsync(whereFn, cancellationToken);
            return forms.FirstOrDefault();
        }

        public async Task<Form?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            System.Linq.Expressions.Expression<Func<Form, bool>> whereFn = (f) => id == f.Id;
            var forms = await _formRepository.GetAllAsync(whereFn, cancellationToken);
            return forms.FirstOrDefault();
        }

        public async Task<bool> IsSlugAvailableAsync(Form form, CancellationToken cancellationToken)
        {
            var result = await GetBySlugAsync(form.Slug, cancellationToken);
            
            bool sameForm = result?.Id == form.Id;
            bool slugExists = result != null;
            return !slugExists || sameForm;
        }

        public async Task<Form> UpdateAsync(Form updatedForm, CancellationToken cancellationToken)
        {
            Form form = await GetByIdAsync(updatedForm.Id, cancellationToken);
            form.Title = updatedForm.Title;
            form.Description = updatedForm.Description;
            form.DateUpdated = DateTime.Now;
            form.Slug = updatedForm.Slug;

            await _formRepository.UpdateAsync(form, cancellationToken);
            return updatedForm;
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

        public async Task SetRegistrationsStatus(Guid formId, bool status, CancellationToken cancellationToken)
        {
            Form form = await GetByIdAsync(formId, cancellationToken);
            form.IsOpen = status;

            await UpdateAsync(form, cancellationToken);
        }

        public async Task DeleteAsync(Form form, CancellationToken cancellationToken)
        {
            await _formRepository.DeleteAsync(form, cancellationToken);
        }
    }
}
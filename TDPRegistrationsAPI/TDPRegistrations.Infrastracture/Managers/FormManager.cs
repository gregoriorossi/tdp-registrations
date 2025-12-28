using System.Threading;
using TDPRegistrations.Core.Entities;
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
            DateTime now = DateTime.Now;
            Form form = await GetByIdAsync(updatedForm.Id, cancellationToken);
            form.Title = updatedForm.Title;
            form.Description = updatedForm.Description;
            form.BannerImage = updatedForm.BannerImage;
            form.DateUpdated = DateTime.Now;
            form.Slug = updatedForm.Slug;
            form.BannerImageId = updatedForm.BannerImageId;
            form.PrivacyDisclaimer = updatedForm.PrivacyDisclaimer;
            form.PrivacyAttachment = updatedForm.PrivacyAttachment;

            // remove deleted sections
            var updatedIds = updatedForm.Sections.Where(s => s.Id != Guid.Empty)
                                         .Select(f => f.Id)
                                         .ToHashSet();

            foreach (var section in form.Sections.ToList())
            {
                if (!updatedIds.Contains(section.Id))
                {
                    // verificare se vengono rimossi anche i campi a cascata
                    form.Sections.Remove(section);
                }
            }

            // add new sections
            var newSections = updatedForm.Sections.Where(s => s.Id == Guid.Empty).ToList();
            newSections.ForEach(f =>
            {
                form.Sections.Add(f);
            });

            // update sections
            var existingSectionsById = form.Sections.ToDictionary(f => f.Id);

            foreach (var updatedSection in updatedForm.Sections.ToList())
            {
                if (existingSectionsById.TryGetValue(updatedSection.Id, out var sectionToUpdate))
                {
                    sectionToUpdate.Title = updatedSection.Title;
                    sectionToUpdate.Description = updatedSection.Description;
                    sectionToUpdate.Order = updatedSection.Order;

                    UpdateFieldsInSection(updatedSection, sectionToUpdate);
                }
            }


            await _formRepository.UpdateAsync(form, cancellationToken);
            return form;
        }

        private void UpdateFieldsInSection(Section updatedSection, Section sectionToUpdate)
        {
            var now = DateTime.Now;

            // remove deleted fields
            var updatedIds = updatedSection.Fields.Where(f => f.Id != Guid.Empty)
                                         .Select(f => f.Id)
                                         .ToHashSet();

            foreach (var field in sectionToUpdate.Fields.ToList())
            {
                if (!updatedIds.Contains(field.Id))
                {
                    sectionToUpdate.Fields.Remove(field);
                }
            }

            // add new fields
            var newFields = updatedSection.Fields.Where(f => f.Id == Guid.Empty).ToList();
            newFields.ForEach(f =>
            {
                sectionToUpdate.Fields.Add(f);
            });

            // update fields
            var existingFieldsById = sectionToUpdate.Fields.ToDictionary(f => f.Id);

            foreach (var uf in updatedSection.Fields.ToList())
            {
                if (existingFieldsById.TryGetValue(uf.Id, out var field))
                {
                    field.Label = uf.Label;
                    field.Description = uf.Description;
                    field.Order = uf.Order;
                    field.IsMandatory = uf.IsMandatory;
                }
            }
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

        public async Task<FormResponse> SendResponse(FormResponse response, CancellationToken cancellationToken)
        {
            return await _formRepository.SendResponse(response, cancellationToken);
        }
    }
}
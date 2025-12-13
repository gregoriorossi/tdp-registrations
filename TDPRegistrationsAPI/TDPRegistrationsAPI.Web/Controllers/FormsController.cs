using Microsoft.AspNetCore.Mvc;
using TDPRegistrations.Core.Errors;
using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrations.Core.Models;
using TDPRegistrationsAPI.Web.Constants;
using TDPRegistrationsAPI.Web.Mappers;
using TDPRegistrationsAPI.Web.ViewModels;
using TDPRegistrationsAPI.Web.ViewModels.Requests;
using TDPRegistrationsAPI.Web.ViewModels.Responses;

namespace TDPRegistrationsAPI.Web.Controllers
{
    // solo per admin
    [ApiController]
    [Route(Consts.DefaultApiRoute)]
    public class FormsController : ControllerBase
    {
        private readonly IFormManager _formManager;

        public FormsController(IFormManager formManager)
        {
            _formManager = formManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var forms = await _formManager.GetAllAsync(cancellationToken);
            var formsList = forms
               .Select(f => new FormLightVM
               {
                   Id = f.Id,
                   Title = f.Title,
                   IsOpen = f.IsOpen,
                   DateCreated = f.DateCreated,
                   Slug = f.Slug,
               })
                .OrderByDescending(f => f.DateCreated);

            return Ok(Result<IEnumerable<FormLightVM>>.Success(formsList));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            Form? form = await _formManager.GetByIdAsync(id, cancellationToken);
            var result = form == null
                ? Result<Form>.Failure(FormErrors.NotFound)
                : Result<Form>.Success(form);

            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            Form? form = await _formManager.GetByIdAsync(id, cancellationToken);

            if (form == null)
            {
                return Ok(Result<Form>.Failure(FormErrors.NotFound));
            }

            await _formManager.DeleteAsync(form, cancellationToken);
            return Ok(Result<bool>.Success(true));
        }

        [HttpGet]
        [Route("getbyslug/{slug}")]
        public async Task<IActionResult> GetBySlug(string slug, CancellationToken cancellationToken)
        {
            Form? form = await _formManager.GetBySlugAsync(slug, cancellationToken);
            var result = form == null
                ? Result<Form>.Failure(FormErrors.NotFound)
                : Result<Form>.Success(form);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddForm(AddFormVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Form form = ViewModelToEntity.AddFormVMToForm(model);
            bool isSlugAvailable = await _formManager.IsSlugAvailableAsync(form, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result<Form>.Failure(FormErrors.SlugNotAvailable));
            }

            var result = await _formManager.CreateAsync(form, cancellationToken);
            return Ok(Result<Form>.Success(form));
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateForm(UpdateFormVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Form updatedForm = await ViewModelToEntity.UpdateFormVMToForm(model);

            // check validità immagine banner
            bool formExists = await _formManager.FormExists(updatedForm.Id, cancellationToken);
            if (!formExists)
            {
                return Ok(Result<Form>.Failure(FormErrors.NotFound));
            }

            bool isSlugAvailable = await _formManager.IsSlugAvailableAsync(updatedForm, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result<Form>.Failure(FormErrors.SlugNotAvailable));
            }

            var result = await _formManager.UpdateAsync(updatedForm, model.BannerImageDeleted, cancellationToken);
            return Ok(Result<Form>.Success(updatedForm));
        }

        [HttpPatch]
        [Route("SetRegistrationsStatus")]
        public async Task<IActionResult> SetRegistrationsStatus(SetRegistrationsStatusVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Guid formId = model.Id;
            bool status = model.Status;

            bool formExists = await _formManager.FormExists(formId, cancellationToken);
            if (!formExists)
            {
                return Ok(Result<Form>.Failure(FormErrors.NotFound));
            }

            await _formManager.SetRegistrationsStatus(formId, status, cancellationToken);
            return Ok(Result.Success());
        }
    }
}

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
        private readonly IFormManager _formService;

        public FormsController(IFormManager formService)
        {
            _formService = formService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var forms = await _formService.GetAllAsync(cancellationToken);
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
            Form? form = await _formService.GetByIdAsync(id, cancellationToken);
            var result = form == null
                ? Result<Form>.Failure(FormErrors.NotFound)
                : Result<Form>.Success(form);

            return Ok(result);
        }

        [HttpGet]
        [Route("getbyslug/{slug}")]
        public async Task<IActionResult> GetBySlug(string slug, CancellationToken cancellationToken)
        {
            Form? form = await _formService.GetBySlugAsync(slug, cancellationToken);
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
            bool isSlugAvailable = await _formService.IsSlugAvailableAsync(form, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result<Form>.Failure(FormErrors.SlugNotAvailable));
            }

            var result = await _formService.CreateAsync(form, cancellationToken);
            return Ok(Result<Form>.Success(form));
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateForm(UpdateFormVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Form form = ViewModelToEntity.UpdateFormVMToForm(model);

            bool formExists = await _formService.FormExists(form.Id, cancellationToken);
            if (!formExists)
            {
                return Ok(Result<Form>.Failure(FormErrors.NotFound));
            }

            bool isSlugAvailable = await _formService.IsSlugAvailableAsync(form, cancellationToken);
            if (!isSlugAvailable)
            {
                return Ok(Result<Form>.Failure(FormErrors.SlugNotAvailable));
            }

            var result = await _formService.UpdateAsync(form, cancellationToken);
            return Ok(Result<Form>.Success(form));
        }
    }
}

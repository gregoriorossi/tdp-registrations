using Microsoft.AspNetCore.Mvc;
using TDPRegistrations.Core.Errors;
using TDPRegistrations.Core.Interfaces.Services;
using TDPRegistrations.Core.Models;
using TDPRegistrationsAPI.Web.Constants;
using TDPRegistrationsAPI.Web.Mappers;
using TDPRegistrationsAPI.Web.ViewModels;
using TDPRegistrationsAPI.Web.ViewModels.Requests;

namespace TDPRegistrationsAPI.Web.Controllers
{
    // solo per admin
    [ApiController]
    [Route(Consts.DefaultApiRoute)]
    public class FieldsController : ControllerBase
    {
        private readonly IFormService _formService;

        public FieldsController(IFormService formService)
        { 
            _formService = formService;
        }

        [HttpPost]
        [Route("{formId}")]
        public async Task<IActionResult> AddField(Guid formId, [FromBody] AddFieldVM model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Field field = ViewModelToEntity.AddFieldVMToField(model);
            bool formExists = await _formService.FormExists(formId, cancellationToken);
            if (!formExists)
            {
                return Ok(Result<Form>.Failure(FormErrors.NotFound));
            }

            Field fieldResult = await _formService.AddFieldAsync(field, formId, cancellationToken);
            
            return Ok(Result<Field>.Success(fieldResult));
        }
    }
}

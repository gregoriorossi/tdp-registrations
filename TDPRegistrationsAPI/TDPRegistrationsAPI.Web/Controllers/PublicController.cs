using Microsoft.AspNetCore.Mvc;
using TDPRegistrations.Core.Errors;
using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrations.Core.Models;
using TDPRegistrationsAPI.Web.Constants;
using TDPRegistrationsAPI.Web.Mappers;
using TDPRegistrationsAPI.Web.ViewModels;
using TDPRegistrationsAPI.Web.ViewModels.Requests;


namespace TDPRegistrationsAPI.Web.Controllers
{
    [ApiController]
    [Route(Consts.DefaultApiRoute)]
    public class PublicController : ControllerBase
    {
        private readonly IFormManager _formManager;

        public PublicController(IFormManager formManager)
        {
            _formManager = formManager;
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
        [Route("send/{formId}")]
        public async Task<IActionResult> SendResponse(Guid formId, [FromBody] SendResponseVM request, CancellationToken cancellationToken)
        {
            Form? form = await _formManager.GetByIdAsync(formId, cancellationToken);
     
            if (form == null)
            {
                return Ok(Result<Form>.Failure(FormErrors.NotFound));
            }

            var formResponse = ViewModelToEntity.SendResponseVMToFormResponse(request, form);
            var result = await _formManager.SendResponse(formResponse, cancellationToken);
            return Ok();
        }

    }
}

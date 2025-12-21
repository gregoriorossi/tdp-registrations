using Microsoft.AspNetCore.Mvc;
using TDPRegistrations.Core.Errors;
using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrations.Core.Models;
using TDPRegistrationsAPI.Web.Constants;
using TDPRegistrationsAPI.Web.ViewModels;


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
    }
}

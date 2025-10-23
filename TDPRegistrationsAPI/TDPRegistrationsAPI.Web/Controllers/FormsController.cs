using Microsoft.AspNetCore.Mvc;
using TDPRegistrations.Core.Errors;
using TDPRegistrations.Core.Interfaces.Services;
using TDPRegistrations.Core.Models;
using TDPRegistrationsAPI.Web.ViewModels;

namespace TDPRegistrationsAPI.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormsController : ControllerBase
    {
        private readonly IFormService _formService;

        public FormsController(IFormService formService)
        {
            _formService = formService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var forms = await _formService.GetAllAsync(cancellationToken);
            return Ok(Result<IEnumerable<FormLight>>.Success(forms));
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

    }
}

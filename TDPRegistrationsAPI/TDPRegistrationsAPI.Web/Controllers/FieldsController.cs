using Microsoft.AspNetCore.Mvc;
using System.Text;
using TDPRegistrationsAPI.Web.ViewModels.Requests;

namespace TDPRegistrationsAPI.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FieldsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetFields()
        {
            return Ok("fields");
        }

        [HttpPost]
        [Route("{formId}")]
        public async Task<IActionResult> AddField(Guid formId, [FromBody] AddFieldVM model)
        {
            return Ok();
        }
    }
}

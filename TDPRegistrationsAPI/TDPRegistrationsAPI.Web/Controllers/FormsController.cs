using Microsoft.AspNetCore.Mvc;

namespace TDPRegistrationsAPI.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormsController : ControllerBase
    {
        [HttpGet]
        public string Test()
        {
            return "test";
        }
    }
}

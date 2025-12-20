using Microsoft.AspNetCore.Mvc;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrationsAPI.Web.Constants;

namespace TDPRegistrationsAPI.Web.Controllers
{
    [ApiController]
    [Route(Consts.DefaultApiRoute)]
    public class FilesController : ControllerBase
    {
        private readonly IFilesManager _imagesManager;

        public FilesController(IFilesManager imagesManager)
        {
            _imagesManager = imagesManager;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            TDPRegistrations.Core.Entities.File? image = await _imagesManager.GetByIdAsync(id, cancellationToken);
            if (image == null)
            {
                return NotFound();
            }
            else
            {
                return File(image.Data, image.ContentType);
            }
        }
    }
}

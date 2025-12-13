using Microsoft.AspNetCore.Mvc;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrationsAPI.Web.Constants;

namespace TDPRegistrationsAPI.Web.Controllers
{
    [ApiController]
    [Route(Consts.DefaultApiRoute)]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesManager _imagesManager;

        public ImagesController(IImagesManager imagesManager)
        {
            _imagesManager = imagesManager;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            Image? image = await _imagesManager.GetByIdAsync(id, cancellationToken);
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

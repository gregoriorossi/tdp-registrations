using System.Linq.Expressions;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrations.Core.Interfaces.Repositories;

namespace TDPRegistrations.Infrastracture.Managers
{
    public class ImagesManager : IImagesManager
    {
        private readonly IImagesRepository _imagesRepository;

        public ImagesManager(IImagesRepository imagesRepository)
        {
            _imagesRepository = imagesRepository;
        }

        public async Task<Image?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<Image, bool>> whereFn = (i) => i.Id == id;
            var result= await _imagesRepository.GetAllAsync(whereFn, cancellationToken);
            return result.FirstOrDefault();
        }
    }
}

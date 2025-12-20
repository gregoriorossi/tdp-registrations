using System.Linq.Expressions;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Managers;
using TDPRegistrations.Core.Interfaces.Repositories;

namespace TDPRegistrations.Infrastracture.Managers
{
    public class FilesManager : IFilesManager
    {
        private readonly IFilesRepository _imagesRepository;

        public FilesManager(IFilesRepository imagesRepository)
        {
            _imagesRepository = imagesRepository;
        }

        public async Task<Core.Entities.File?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            Expression<Func<Core.Entities.File, bool>> whereFn = (i) => i.Id == id;
            var result= await _imagesRepository.GetAllAsync(whereFn, cancellationToken);
            return result.FirstOrDefault();
        }
    }
}

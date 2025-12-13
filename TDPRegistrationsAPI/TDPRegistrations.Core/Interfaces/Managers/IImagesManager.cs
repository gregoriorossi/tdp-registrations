using TDPRegistrations.Core.Entities;

namespace TDPRegistrations.Core.Interfaces.Managers
{
    public interface IImagesManager
    {
        public Task<Image?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }
}

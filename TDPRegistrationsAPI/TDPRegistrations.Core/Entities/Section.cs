using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Entities
{
    public class Section : BaseModel<Guid>
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public ICollection<Field> Fields { get; set; } = [];

        public int Order { get; set; }
    }
}

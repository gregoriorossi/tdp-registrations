using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Core.Models
{
    [Table("Forms")]
    public class Form : BaseModel<Guid>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public List<Field> Fields { get; set; } = [];
        public string Slug { get; set; } = string.Empty;
    }
}

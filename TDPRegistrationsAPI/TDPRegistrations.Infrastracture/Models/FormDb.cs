using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Infrastracture.Models
{
    [Table("Forms")]
    internal class FormDb : BaseModel<Guid>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public List<FieldDb> Fields { get; set; } = [];
    }
}

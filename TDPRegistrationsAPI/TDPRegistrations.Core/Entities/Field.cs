using System.ComponentModel.DataAnnotations.Schema;
using TDPRegistrations.Core.Enums;

namespace TDPRegistrations.Core.Models
{
    [Table("Fields")]
    public class Field : BaseModel<Guid>
    {
        public string Label { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public FieldTypes Type {  get; set; }
        public bool IsMandatory  { get; set; }
        public List<FieldOption> Options { get; set; } = [];
    }
}

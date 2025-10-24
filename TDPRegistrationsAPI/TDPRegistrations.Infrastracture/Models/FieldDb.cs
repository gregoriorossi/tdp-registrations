using System.ComponentModel.DataAnnotations.Schema;
using TDPRegistrations.Core.Enums;

namespace TDPRegistrations.Infrastracture.Models
{
    [Table("Fields")]
    internal class FieldDb : BaseModel<Guid>
    {
        public string Label { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public FieldTypes Type { get; set; }
        public bool IsMandatory { get; set; }
        public int Order {  get; set; }
        public List<FieldOptionDb> Options { get; set; } = [];
    }
}

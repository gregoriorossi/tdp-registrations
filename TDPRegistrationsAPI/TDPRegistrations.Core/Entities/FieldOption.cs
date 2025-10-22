using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Core.Models
{
    [Table("FieldOptions")]
    public class FieldOption : BaseModel<Guid>
    {
        public string Label { get; set; } = string.Empty;
    }
}

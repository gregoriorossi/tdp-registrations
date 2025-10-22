using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Core.Models
{
    [Table("FieldResponseOptions")]
    public class FieldResponseOption : BaseModel<Guid>
    {
        public required FieldOption FieldOption { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Core.Models
{
    [Table("FieldResponses")]
    public class FieldResponse : BaseModel<Guid>
    {
        public string Value { get; set; } = string.Empty;
        public List<FieldResponseOption> Options { get; set; } = [];
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Infrastracture.Models
{
    [Table("FieldResponses")]
    internal class FieldResponseDb : BaseModel<Guid>
    {
        public string Value { get; set; } = string.Empty;
        public List<FieldResponseOptionDb> Options { get; set; } = [];
    }
}

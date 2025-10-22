using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Infrastracture.Models
{
    [Table("FieldResponseOptions")]
    internal class FieldResponseOptionDb : BaseModel<Guid>
    {
        public required FieldOptionDb FieldOption { get; set; }
    }
}

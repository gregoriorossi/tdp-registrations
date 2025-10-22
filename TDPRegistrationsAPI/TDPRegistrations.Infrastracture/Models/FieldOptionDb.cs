using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Infrastracture.Models
{
    [Table("FieldOptions")]
    internal class FieldOptionDb : BaseModel<Guid>
    {
        public string Label { get; set; } = string.Empty;
    }
}

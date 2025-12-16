using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Core.Models
{
    [Table("FieldOptions")]
    public class FieldOption : BaseModel<Guid>
    {
        public string Label { get; set; } = string.Empty;
        public int Order { get; set; } = 0;

        public FieldOption()
        {
        }

        public FieldOption(string label, int order)
        {
            Label = label;
            Order = order;
        }
    }
}

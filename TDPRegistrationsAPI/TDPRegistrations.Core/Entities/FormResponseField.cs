using System.ComponentModel.DataAnnotations.Schema;
using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Entities
{
    [Table("FormResponsesFields")]
    public class FormResponseField : BaseModel<Guid>
    {
        public Guid FormFieldId { get; set; }

        public string Value { get; set; } = string.Empty;
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using TDPRegistrations.Core.Entities;

namespace TDPRegistrations.Core.Models
{
    [Table("FormResponses")]
    public class FormResponse : BaseModel<Guid>
    {
        public required Guid FormId { get; set; }

        public List<FormResponseField> Fields { get; set; } = new List<FormResponseField>();

        public DateTime CreationDate { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Core.Models
{
    [Table("FormResponses")]
    public class FormResponse : BaseModel<Guid>
    {
        public required Form Form { get; set; }
    }
}

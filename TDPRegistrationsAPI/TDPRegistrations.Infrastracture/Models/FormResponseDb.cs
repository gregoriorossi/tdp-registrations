using System.ComponentModel.DataAnnotations.Schema;

namespace TDPRegistrations.Infrastracture.Models
{
    [Table("FormResponses")]
    internal class FormResponseDb : BaseModel<Guid>
    {
        public required FormDb Form { get; set; }
    }
}

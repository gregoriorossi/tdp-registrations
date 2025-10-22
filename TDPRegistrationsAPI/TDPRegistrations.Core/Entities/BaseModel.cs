using System.ComponentModel.DataAnnotations;

namespace TDPRegistrations.Core.Models
{
    public class BaseModel<T>
    {
        [Key]
        public T Id { get; set; }

        public DateTime? DateCreated { get; set; }

        public DateTime? DateUpdated { get; set; }
    }
}

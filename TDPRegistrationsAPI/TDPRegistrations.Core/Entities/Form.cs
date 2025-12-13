using System.ComponentModel.DataAnnotations.Schema;
using TDPRegistrations.Core.Entities;

namespace TDPRegistrations.Core.Models
{
    [Table("Forms")]
    public class Form : BaseModel<Guid>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsOpen { get; set; }
        public ICollection<Field> Fields { get; set; } = [];
        public string Slug { get; set; } = string.Empty;
        public Image? BannerImage { get; set; }
        public Guid? BannerImageId { get; set; }
    }
}

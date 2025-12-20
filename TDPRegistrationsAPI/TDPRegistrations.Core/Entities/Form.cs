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

        public ICollection<Section> Sections { get; set; } = [];

        public string Slug { get; set; } = string.Empty;

        public Entities.File? BannerImage { get; set; }

        public Guid? BannerImageId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }

        public string PrivacyDisclaimer { get; set; } = string.Empty;

        public Entities.File? PrivacyAttachment { get; set; }
        public Guid? PrivacyAttachmentId { get; set; }
    }
}

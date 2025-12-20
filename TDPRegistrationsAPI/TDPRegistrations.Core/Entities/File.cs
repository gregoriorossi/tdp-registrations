using System.ComponentModel.DataAnnotations.Schema;
using TDPRegistrations.Core.Models;

namespace TDPRegistrations.Core.Entities
{
    [Table("Files")]
    public class File : BaseModel<Guid>
    {
        public string FileName { get; set; } = default!;
        public string ContentType { get; set; } = default!;
        public long Length { get; set; }
        public byte[] Data { get; set; } = default!;
    }
}

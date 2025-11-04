using System.ComponentModel.DataAnnotations;

namespace TDPRegistrationsAPI.Web.ViewModels.Requests
{
    public class AddFieldVM
    {
        [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
        public string Label { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        public bool IsMandatory { get; set; }

        public List<string> Options { get; set; } = [];
    }
}

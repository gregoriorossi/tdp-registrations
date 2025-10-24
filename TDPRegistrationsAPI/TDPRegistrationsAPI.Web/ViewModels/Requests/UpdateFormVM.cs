using System.ComponentModel.DataAnnotations;

namespace TDPRegistrationsAPI.Web.ViewModels.Requests
{
    public class UpdateFormVM
    {
        [Required]
        public Guid Id { get; set; }

        [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
    }
}

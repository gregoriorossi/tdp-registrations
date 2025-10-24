using System.ComponentModel.DataAnnotations;

namespace TDPRegistrationsAPI.Web.ViewModels.Requests
{
    public class AddFormVM
    {
        [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
        public string Title { get; set; } = string.Empty;
    }
}

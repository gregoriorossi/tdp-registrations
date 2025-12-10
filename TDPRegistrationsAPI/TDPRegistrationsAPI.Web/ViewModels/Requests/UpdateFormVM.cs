using System.ComponentModel.DataAnnotations;

namespace TDPRegistrationsAPI.Web.ViewModels.Requests
{
    public class UpdateFormVM
    {
        [Required]
        public Guid Id { get; set; }

        [Required, StringLength(maximumLength: 100, MinimumLength = 5)]
        public string Title { get; set; } = string.Empty;

        public IFormFile? BannerImage { get; set; }

        public string Description { get; set; } = string.Empty;

        public string Fields { get; set; } = string.Empty;
    }

    public class UpdateFormFieldVM
    {
        public Guid? Id { get; set; }

        public string Label { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required]
        public int Type { get; set; }

        public bool IsMandatory { get; set; }

        public List<UpdateFormFieldOptionVM> Options { get; set; } = [];

        public int Order { get; set; } = 0;
    }

    public class UpdateFormFieldOptionVM
    {
        public string Label { get; set; } = string.Empty;
        public int Order { get; set; } = 0;
    }
}

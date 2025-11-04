namespace TDPRegistrationsAPI.Web.ViewModels.Responses
{
    public class FormLightVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public bool IsOpen { get; set; }
        public DateTime DateCreated { get; set; }
    }
}

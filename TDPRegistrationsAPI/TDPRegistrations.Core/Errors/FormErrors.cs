namespace TDPRegistrations.Core.Errors
{
    public static class FormErrors
    {
        public static readonly Error NotFound = new Error("FormErrors.NotFound", "Form not found");
        public static readonly Error SlugNotAvailable = new Error("FormErrors.SlugNotAvailable", "Slug Not Available");
    }
}

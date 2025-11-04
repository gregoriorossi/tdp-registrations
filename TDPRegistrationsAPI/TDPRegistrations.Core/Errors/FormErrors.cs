namespace TDPRegistrations.Core.Errors
{
    public static class FormErrors
    {
        public static readonly Error NotFound = new Error("FormErrors.NotFound", "Form not found");
        public static readonly Error SlugNotAvailable = new Error("FormErrors.SlugNotAvailable", "Slug Not Available");
    }

    public static class FieldErrors
    {
        public static readonly Func<string, Error> NotValid = (string errorMessage) => new Error("FieldErrors.NotValid", errorMessage);
        public static class FieldErrorCodes
        {
            public static string MissingLabel = "FieldErrorCodes.MissingLabel";
            public static string SingleChoiceWrongOptions = "FieldErrorCodes.SingleChoiceWrongOptions";
            public static string MultipleChoiceWrongOptions = "FieldErrorCodes.MultipleChoiceWrongOptions";
        }
    }
}

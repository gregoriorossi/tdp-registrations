namespace TDPRegistrationsAPI.Web.ViewModels
{
    public sealed record class Error(string code, string description)
    {
        public static readonly Error None = new(string.Empty, string.Empty);
    }
}

namespace TDPRegistrations.Core.Errors
{
    public sealed record class Error(string code, string description)
    {
        public static readonly Error None = new(string.Empty, string.Empty);
    }
}

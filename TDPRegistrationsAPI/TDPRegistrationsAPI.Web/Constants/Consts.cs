namespace TDPRegistrationsAPI.Web.Constants
{
    public class Consts
    {
        public const string DefaultApiRoute = "api/[controller]";

        public static class Config
        {
            public static class JWT
            {
                public const string Key = "Jwt:Key";
                public const string Issuer = "Jwt:Issuer";
            }
        }

        public static class Roles
        {
            public const string EDITOR = "EDITOR";
        }
    }
}

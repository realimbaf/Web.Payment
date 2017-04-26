using System.Configuration;

namespace Wiki.RemotePayment.Common
{
    public static  class IdentityConstants
    {
        public static string IdentityServerUrl = ConfigurationManager.AppSettings["IdentityServerUrl"];
        public static string ClientId = ConfigurationManager.AppSettings["IdentityClientId"];
        public static string ClientSecret = ConfigurationManager.AppSettings["IdentityClientSecret"];
        public static string RedirectUri = ConfigurationManager.AppSettings["IdentityRedirectUri"];
        public static string PostLogoutRedirectUri = ConfigurationManager.AppSettings["IdentityLogoutRedirectUri"];

        public static string AuthorizeEndpoint = IdentityServerUrl + "/connect/authorize";
        public static string LogoutEndpoint = IdentityServerUrl + "/connect/endsession";
        public static string TokenEndpoint = IdentityServerUrl + "/connect/token";
        public static string UserInfoEndpoint = IdentityServerUrl + "/connect/userinfo";
        public static string IdentityTokenValidationEndpoint = IdentityServerUrl + "/connect/identitytokenvalidation";
        public static string TokenRevocationEndpoint = IdentityServerUrl + "/connect/revocation";
    }
}
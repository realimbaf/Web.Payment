using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.IdentityModel.Protocols;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Notifications;
using Microsoft.Owin.Security.OpenIdConnect;
using Owin;
using Thinktecture.IdentityModel.Client;
using Wiki.RemotePayment.Common;
using Wiki.Security.Handler;
using Wiki.Security.MVC;
using Wiki.Security.WebAPI;

[assembly: OwinStartup(typeof(Wiki.RemotePayment.Startup))]
namespace Wiki.RemotePayment
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            WikiMvcAuthorizeAttribute.SetCheckAccessDelegate((a,b)=>true);
            WikiApiAuthorizeAttribute.SetCheckAccessDelegate((a,b)=>true);

            var config = new HttpConfiguration();
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationType = "Cookies"
            });
            app.UseOpenIdConnectAuthentication(new OpenIdConnectAuthenticationOptions
            {
                ClientId = IdentityConstants.ClientId,
                Authority = IdentityConstants.IdentityServerUrl,
                RedirectUri = IdentityConstants.RedirectUri,
                PostLogoutRedirectUri = "http://mishenko",
                ResponseType = "code id_token",
                Scope = "openid web offline_access",
                UseTokenLifetime = false,
                SignInAsAuthenticationType = "Cookies",
                Notifications = new OpenIdConnectAuthenticationNotifications
                {
                    AuthorizationCodeReceived = AuthorizationCodeReceived(),
                    RedirectToIdentityProvider = n =>
                    {
                        if (n.ProtocolMessage.RequestType == OpenIdConnectRequestType.LogoutRequest)
                        {
                            var idTokenHint = n.OwinContext.Authentication.User.FindFirst("id_token");

                            if (idTokenHint != null)
                            {
                                n.ProtocolMessage.IdTokenHint = idTokenHint.Value;
                            }
                        }

                        return Task.FromResult(0);
                    }
                }

            });
            app.UseWebApi(config);
            RegisterRoutes(RouteTable.Routes, config);
        }
        private static Func<AuthorizationCodeReceivedNotification, Task> AuthorizationCodeReceived()
        {
            return async n =>
            {
                var tokenClient = new OAuth2Client(new Uri(IdentityConstants.TokenEndpoint),
                    IdentityConstants.ClientId,
                    IdentityConstants.ClientSecret);
                var tokenResponse = await tokenClient.RequestAuthorizationCodeAsync(
                    n.Code, n.RedirectUri);
                if (tokenResponse.IsError)
                {
                    throw new Exception(tokenResponse.Error);
                }
                // use the access token to retrieve claims from userinfo
                var userInfoClient = new UserInfoClient(
                    new Uri(IdentityConstants.UserInfoEndpoint), tokenResponse.AccessToken);
                var userInfoResponse = await userInfoClient.GetAsync();

                // create new identity
                var id = new ClaimsIdentity(n.AuthenticationTicket.Identity.AuthenticationType);
                id.AddClaims(userInfoResponse.Claims.Select(x => new Claim(x.Item1, x.Item2)));
                id.AddClaim(new Claim("access_token", tokenResponse.AccessToken));
                id.AddClaim(new Claim("expires_at", DateTime.Now.AddSeconds(tokenResponse.ExpiresIn).ToLocalTime().ToString(CultureInfo.InvariantCulture)));
                id.AddClaim(new Claim("exp", tokenResponse.ExpiresIn.ToString()));
                id.AddClaim(new Claim("refresh_token", tokenResponse.RefreshToken));
                id.AddClaim(new Claim("role","AdminPayment"));
                n.AuthenticationTicket = new AuthenticationTicket(
                    new ClaimsIdentity(id.Claims, n.AuthenticationTicket.Identity.AuthenticationType,"name", "role"),
                    n.AuthenticationTicket.Properties);
            };
        }
        public static void RegisterRoutes(RouteCollection routes, HttpConfiguration config)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Имя маршрута
                "{controller}/{action}/{id}", // URL-адрес с параметрами
                new { controller = "PaymentView", action = "Index", id = UrlParameter.Optional } // Параметры по умолчанию
            );
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional }
                );
        }
    }
}
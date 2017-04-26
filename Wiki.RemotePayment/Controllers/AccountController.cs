using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;
using Wiki.RemotePayment.Common;
using Wiki.RemotePayment.Helpers;

namespace Wiki.RemotePayment.Controllers
{
    [Auth(Roles = "AdminPayment,ManagerPayment,AuditorPayment")]
    public class AccountController : Controller
    {
        public ActionResult Logout()
        {
            if (Request.GetOwinContext().Authentication.User.Identity.IsAuthenticated)
            {
                var properties = new AuthenticationProperties
                {
                    RedirectUri = IdentityConstants.RedirectUri
                };

                Request.GetOwinContext().Authentication.SignOut(properties);
            }
            return Redirect("/");
        }

    }
}

using System.Web.Mvc;

namespace Wiki.RemotePayment.Helpers
{
    public class AuthAttribute : AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                filterContext.Result = new HttpStatusCodeResult(System.Net.HttpStatusCode.Forbidden);
            }
            else
            {
                filterContext.Result = new HttpUnauthorizedResult();
            }
        }
    }
}
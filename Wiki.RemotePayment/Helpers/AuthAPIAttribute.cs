using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Wiki.RemotePayment.Helpers
{
    public class AuthAPIAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// Gets or sets the authorized roles.
        /// </summary>
        public new string Roles
        {
            get { return base.Roles; }
            set { base.Roles = value; }
        }

        /// <summary>
        ///  Gets or sets the authorized users.
        /// </summary>
        public new string Users
        {
            get { return base.Users; }
            set { base.Users = value; }
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var principal = actionContext.RequestContext.Principal as ClaimsPrincipal;
            if (principal != null && !principal.Identity.IsAuthenticated)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden,
                    "Not allowed to access...");
                return;
            }
            var roles = principal.Claims.Where(x => x.Type == "role").Select(x => x.Value);
            if (!roles.Intersect(Roles.Split(',')).Any())
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden,
                    "Not allowed to access...");
            }

        }
    }
}
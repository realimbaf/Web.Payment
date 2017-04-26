using System.Linq;
using System.Security.Claims;
using Wiki.RemotePayment.Common;

namespace Wiki.RemotePayment.Utils
{
    public class StaticDomain
    {
        public static Operator CreateOperator(ClaimsPrincipal principal)
        {
            var claimToDictionary = principal.Claims.ToDictionary(x => x.Type, x => x.Value);
            return new Operator(claimToDictionary["sub"],
                claimToDictionary["given_name"],
                int.Parse(claimToDictionary["Wiki.CompanyId"]),
                int.Parse(claimToDictionary["Wiki.ClientId"]),
                int.Parse(claimToDictionary["Wiki.ClientCode"]));
            // claimToDictionary["role"]);
        }
    }
}
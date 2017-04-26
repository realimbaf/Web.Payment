using System;
using System.Collections.Generic;
using System.Linq;

namespace Wiki.RemotePayment.Utils
{
    public static class IEnumerableExtension
    {
        public static bool IsValidRole(this IList<string> enumerator,string role)
        {
            return enumerator.Any(x => x.Equals(role, StringComparison.OrdinalIgnoreCase));
        }
    }
}
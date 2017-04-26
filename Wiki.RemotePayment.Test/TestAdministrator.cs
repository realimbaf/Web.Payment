using System;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Wiki.RemotePayment.Controllers;

namespace Wiki.RemotePayment.Test
{
    [TestClass]
    public class TestAdministrator
    {
        [TestMethod]
        public void GetPayment()
        {
            var controller = new PaymentController
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
            controller.User = new GenericPrincipal(new GenericIdentity("Егор Корнеев","claim"),new []{"AdminPayment"} );
        }
    }
}

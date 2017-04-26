using System.Web.Mvc;
using Wiki.RemotePayment.Helpers;

namespace Wiki.RemotePayment.Controllers
{
    public class PaymentViewController : Controller
    {
        [Auth(Roles = "AdminPayment,ManagerPayment")]
        // [WikiMvcAuthorize1("1")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Managers()
        {
            return View();
        }

        public ActionResult Sms()
        {
            return View();
        }
    }
}
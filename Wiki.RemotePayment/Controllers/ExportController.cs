using System.Threading.Tasks;
using System.Web.Http;
using Wiki.Payment.Client;
using Wiki.Payment.Common.POCO.DTO;

namespace Wiki.RemotePayment.Controllers
{
    [RoutePrefix("api/Export")]
    public class ExportController : ApiController
    {
        private readonly PaymentClient _client = new PaymentClient();

        [Route("Erp")]
        [HttpPost]
        public async Task ErpReport([FromBody]DTOErp erpCodes)
        {
            await _client.ReportToErp(erpCodes);
        }
    }
}

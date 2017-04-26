using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Wiki.Sms.Client;
using Wiki.Sms.Common.Model;

namespace Wiki.RemotePayment.Controllers
{
    [RoutePrefix("api/Sms")]
    public class SmsController : ApiController
    {
        private readonly SmsClient _client = new SmsClient();
        [Route("")]
        public Task<List<SmsMessage>> GetSms()
        {
            return _client.GetAll();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Wiki.Payment.Client;
using Wiki.Payment.Common.POCO.DTO;

namespace Wiki.RemotePayment.Controllers
{
    [RoutePrefix("Managers")]
    public class ManagerController : ApiController
    {
        private readonly PaymentClient _client = new PaymentClient();
        [Route("")]
        [HttpPost]
        public async Task<ReturnModel> AddManager([FromBody]DTOManager manager)
        {
            try
            {
                return await _client.AddManager(manager);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
        [Route("")]
        [HttpGet]
        public async Task<List<DTOManager>> GetManagers()
        {
            try
            {
                return await _client.GetAllowedManagers();
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }    
        [Route("{id}")]
        [HttpDelete]
        public async Task DeleteManager(int id)
        {
            try
            {
                await _client.DeleteManager(id);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
        [Route("{id}")]
        [HttpPut]
        public async Task<ReturnModel> PutManager(int id, [FromBody]DTOManager manager)
        {
            try
            {
                var result = await _client.UpdateManager(id, manager);
                return result;
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
    }
}
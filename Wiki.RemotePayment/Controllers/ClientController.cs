using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Wiki.Payment.Client;
using Wiki.Payment.Common.POCO.DTO;
using Wiki.RemotePayment.Common;
using Wiki.RemotePayment.Helpers;
using Wiki.RemotePayment.Utils;
using Wiki.Security.WebAPI;

namespace Wiki.RemotePayment.Controllers
{
    [RoutePrefix("api/Clients")]
   // [WikiApiAuthorize("clients")]
    public class ClientController : ApiController
    {
        private readonly PaymentClient _client = new PaymentClient();

        [Route("")]
        public async Task<List<DTOClient>> GetClients(DTOClients clients)
        {
            try
            {
               
                return await _client.GetClients(clients);
            }
            catch (ArgumentException )
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
        [Route("User")]
        public Operator GetUser()
        {
            return StaticDomain.CreateOperator((ClaimsPrincipal)User);
        }
        [Route("{id}")]
        [HttpGet]
        public async Task<DTOClient> GetClient(int id)
        {
            try
            {
               return await _client.GetClientById(id);
            }
            catch (ArgumentException)
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
        [Route("Code/{clientCode}")]
        [HttpGet]
        public async Task<DTOClient> GetClientByCode(int clientCode)
        {
            try
            {
                return await _client.GetClientByCode(clientCode);
            }
            catch (ArgumentException)
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
        [Route("Managers")]
        [HttpPost]
        public async Task<ReturnModel> AddManager([FromBody]DTOManager manager)
        {
            try
            {
                return await _client.AddManager(manager);
            }
            catch (Exception )
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
        [Route("Managers")]
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
        [Route("Managers/{id}")]
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
        [Route("Managers/{id}")]
        [HttpPut]
        public async Task<ReturnModel> PutManager(int id,[FromBody]DTOManager manager)
        {
            try
            {
                var result =  await _client.UpdateManager(id, manager);
                return result;
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
    }
}

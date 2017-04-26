using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Wiki.Payment.Common.POCO.DTO;
using Wiki.RemotePayment.Bll.Implement;
using Wiki.RemotePayment.Helpers;
using Wiki.RemotePayment.Utils;
using Wiki.Security.WebAPI;

namespace Wiki.RemotePayment.Controllers
{
    [RoutePrefix("api/Payments")]
    public class PaymentController : ApiController
    {
        private  PayerContext _context;

        [Route("")]
        //[AuthAPI(Roles = "AdminPayment,ManagerPayment,AuditorPayment")]
      //  [WikiApiAuthorize("GetPayments")]
        public async Task<List<DTOPayment>> GetPayments()
        {
            try
            {
                _context = new PayerContext(StaticDomain.CreateOperator((ClaimsPrincipal) User));
                var payments = await _context.GetPayments();
                payments.Reverse();
                return payments;
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

        [Route("{id}")]
        // [AuthAPI(Roles = "AdminPayment,ManagerPayment,AuditorPayment")]
        [WikiApiAuthorize("GetPayments")]

        public async Task<DTOPayment> GetPayment(int id)
        {
            try
            {
                _context = new PayerContext(StaticDomain.CreateOperator((ClaimsPrincipal)User));
                return await _context.GetPayment(id);
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

        [Route("")]
       // [AuthAPI(Roles = "AdminPayment,ManagerPayment")]
        [HttpPost]
        [WikiApiAuthorize("GetPayments")]

        public async Task<ReturnModel> PostPayment([FromBody] DTOInsertPayment payment)
        {
            try
            {
                _context = new PayerContext(StaticDomain.CreateOperator((ClaimsPrincipal)User));
                return await _context.AddPayment(payment);

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

        [Route("{id}")]
       // [AuthAPI(Roles = "AdminPayment,ManagerPayment")]
        [HttpPut]
        [WikiApiAuthorize("GetPayments")]

        public async Task<ReturnModel> PutPayment(int id, [FromBody] DTOUpdatePayment payment)
        {
            try
            {

                _context = new PayerContext(StaticDomain.CreateOperator((ClaimsPrincipal)User));
                return await _context.UpdatePayment(id, payment);

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

        [Route("{id}")]
       // [AuthAPI(Roles = "AdminPayment,ManagerPayment")]
        [HttpDelete]
        [WikiApiAuthorize("GetPayments")]

        public async Task DeletePayment(int id)
        {
            try
            {
                _context = new PayerContext(StaticDomain.CreateOperator((ClaimsPrincipal)User));
                await _context.DeletePayment(id);

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

       
    }
}
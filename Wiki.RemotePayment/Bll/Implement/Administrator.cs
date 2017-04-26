using System.Collections.Generic;
using System.Threading.Tasks;
using Wiki.Payment.Client;
using Wiki.Payment.Common.POCO.DTO;
using Wiki.RemotePayment.Bll.Contract;
using Wiki.RemotePayment.Common;

namespace Wiki.RemotePayment.Bll.Implement
{
    public class Administrator : IPayer
    {
        private readonly Operator _instructor;
        private readonly PaymentClient _client;

        public Administrator(Operator instructor)
        {
            _instructor = instructor;
            _client = new PaymentClient();
        }

        public async Task<List<DTOPayment>> GetPayments()
        {
            return await _client.GetAllPayments();
        }

        public async Task<DTOPayment> GetPayment(int id)
        {
            return await _client.GetPaymentById(id);
        }

        public async Task<ReturnModel> InsertPayment(DTOInsertPayment payment)
        {
            return await _client.AddPayment(payment);
        }

        public async Task<ReturnModel> UpdatePayment(int paymentId,DTOUpdatePayment payment)
        {
            return await _client.UpdatePayment(paymentId,payment);
        }

        public async Task DeletePayment(int paymentId)
        {
            await _client.DeletePayment(paymentId);
        }
    }
}
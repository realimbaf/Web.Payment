using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wiki.Payment.Client;
using Wiki.Payment.Common.POCO.DTO;
using Wiki.RemotePayment.Bll.Contract;
using Wiki.RemotePayment.Common;

namespace Wiki.RemotePayment.Bll.Implement
{
    public class Auditor : IPayer
    {
        private readonly Operator _instructor;
        private readonly PaymentClient _client;

        public Auditor(Operator instructor)
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

        public Task<ReturnModel> InsertPayment(DTOInsertPayment payment)
        {
            throw new ArgumentException("client with current id cannot doing this");
        }

        public Task<ReturnModel> UpdatePayment(int paymentId, DTOUpdatePayment payment)
        {
            throw new ArgumentException("client with current id cannot doing this");
        }

        public Task DeletePayment(int paymentId)
        {
            throw new ArgumentException("client with current id cannot doing this");
        }
    }
}
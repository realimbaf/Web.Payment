using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wiki.Payment.Client;
using Wiki.Payment.Common.POCO.DTO;
using Wiki.RemotePayment.Bll.Contract;
using Wiki.RemotePayment.Common;

namespace Wiki.RemotePayment.Bll.Implement
{
    public class Manager : IPayer
    {
        private readonly Operator _instructor;
        private readonly PaymentClient _client;

        public Manager(Operator instructor )
        {
            _instructor = instructor;
            _client = new PaymentClient();
        }

        public async Task<List<DTOPayment>> GetPayments()
        {
            return await _client.GetAllPayments(_instructor.ClientId);
        }

        public async Task<DTOPayment> GetPayment(int id)
        {
            var paymentOrNothing = await _client.GetPaymentById(id);
            if (paymentOrNothing != null && paymentOrNothing.OperatorId == _instructor.ClientId)
            {
                return paymentOrNothing;
            }
            throw new ArgumentException("client with current id cannot doing this");
        }

        public async Task<ReturnModel> InsertPayment(DTOInsertPayment payment)
        {
            if (payment.OperatorId == _instructor.ClientId)
            {
                return await _client.AddPayment(payment);
            }
            throw new ArgumentException("client with current id cannot doing this");
        }

        public async Task<ReturnModel> UpdatePayment(int paymentId, DTOUpdatePayment payment)
        {
            if (payment.OperatorId == _instructor.ClientId)
            {
                return await _client.UpdatePayment(paymentId, payment);
            }
            throw new ArgumentException("client with current id cannot doing this");
        }

        public async Task DeletePayment(int paymentId)
        {
            var paymentOrNothing = await _client.GetPaymentById(paymentId);
            if (paymentOrNothing?.OperatorId == _instructor.ClientId)
            {
                await _client.DeletePayment(paymentId);
            }
            else
            {
                throw new ArgumentException("client with current id cannot doing this");
            }
            
        }
    }
}
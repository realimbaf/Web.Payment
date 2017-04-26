using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Wiki.Payment.Common.POCO.DTO;
using Wiki.RemotePayment.Bll.Contract;
using Wiki.RemotePayment.Common;

namespace Wiki.RemotePayment.Bll.Implement
{
    public class PayerContext
    {
        private readonly Operator _instructor;
        public IPayer ActivePayer { get; set; } = new VoidPayer();

        public IDictionary<string, IPayer> PayerDictionary { get; set; } 

        public PayerContext([NotNull] Operator instructor)
        {
            _instructor = instructor;
            PayerDictionary  = new Dictionary<string, IPayer>
                {
                    {"AdminPayment", new Administrator(_instructor)},
                    {"ManagerPayment", new Manager(_instructor)},
                    {"AuditorPayment", new Auditor(_instructor)},
                };
            if (PayerDictionary.Keys.Any(x => x.Equals(_instructor.SeniorRole, StringComparison.OrdinalIgnoreCase)))
            {
                ChangePayer(PayerDictionary[_instructor.SeniorRole]);
            }
        }

        private void ChangePayer(IPayer payer)
        {
            this.ActivePayer = payer;
        }

        public async Task<List<DTOPayment>> GetPayments()
        {
            return await ActivePayer.GetPayments();
        }
        public async Task<DTOPayment> GetPayment(int id)
        {
            return await ActivePayer.GetPayment(id);
        }

        public async Task<ReturnModel> AddPayment([NotNull]DTOInsertPayment payment)
        {
            return await ActivePayer.InsertPayment(payment);
        }

        public async Task<ReturnModel> UpdatePayment(int paymentId, DTOUpdatePayment payment)
        {
            return await ActivePayer.UpdatePayment(paymentId, payment);
        }

        public async Task DeletePayment(int id)
        {
            await ActivePayer.DeletePayment(id);
        }

    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Wiki.Payment.Common.POCO.DTO;
using Wiki.RemotePayment.Bll.Contract;

namespace Wiki.RemotePayment.Bll.Implement
{
    public class VoidPayer : IPayer
    {
        private static VoidPayer _instance;
        public static VoidPayer Instance => _instance ?? (_instance = new VoidPayer());

        public bool IsValid { get; } = false;
        public string SeniorRole { get; } = "Anonimous";
        public Task<List<DTOPayment>>  GetPayments() => Task.FromResult(new List<DTOPayment>());
        public Task<DTOPayment> GetPayment(int id) => Task.FromResult(new DTOPayment());
        public Task<ReturnModel> InsertPayment(DTOInsertPayment payment) => Task.FromResult(new ReturnModel());

        public Task<ReturnModel> UpdatePayment(int paymentId, DTOUpdatePayment payment) => Task.FromResult(new ReturnModel());
        public Task DeletePayment(int paymentId) => Task.FromResult<object>(null);

    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Wiki.Payment.Common.POCO.DTO;

namespace Wiki.RemotePayment.Bll.Contract
{
    public interface IPayer
    {
        Task<List<DTOPayment>> GetPayments();
        Task<DTOPayment> GetPayment(int id);
        Task<ReturnModel> InsertPayment([NotNull]DTOInsertPayment payment);
        Task<ReturnModel> UpdatePayment(int paymentId, [NotNull]DTOUpdatePayment payment);
        Task DeletePayment(int paymentId);
    }
}

using JetBrains.Annotations;

namespace Wiki.RemotePayment.Common
{
    public class Operator
    {
        public string Id { get; private set; }
        public string Name { get; private set; }
        public int CompanyId { get; private set; }
        public int ClientId { get; private set; }
        public int ClientCode { get; private set; }
        public string SeniorRole { get; private set; }

        public Operator([NotNull]string id, [NotNull]string name, int companyId, int clientId, int clientCode )
        {
            Id = id;
            Name = name;
            CompanyId = companyId;
            ClientId = clientId;
            ClientCode = clientCode;
            SeniorRole = "AdminPayment";
        }
    }
}
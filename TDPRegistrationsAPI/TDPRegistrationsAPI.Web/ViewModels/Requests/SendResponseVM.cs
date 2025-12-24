using System.Text.Json.Nodes;

namespace TDPRegistrationsAPI.Web.ViewModels.Requests
{
    public class SendResponseVM
    {
        public List<SendResponseItemVM> Fields { get; set; } = new List<SendResponseItemVM>();
    }

    public class SendResponseItemVM
    {
        public required string id { get; set; }

        public JsonValue? value { get; set; }
    }
}

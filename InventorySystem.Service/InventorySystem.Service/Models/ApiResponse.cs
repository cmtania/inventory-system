namespace InventorySystem.Service.Models
{
    public class ApiResponse
    {
        public bool IsOk { get; set; }
        public ResponseMessage[] Messages { get; set; }
        public object[] Results { get; set; }
        

        public ApiResponse()
        {
            IsOk = true;
            Messages = Array.Empty<ResponseMessage>();
            Results = Array.Empty<object>();
            
        }

        public ApiResponse(bool isOk, object[] results, ResponseMessage[] messages)
        {
            IsOk = isOk;
            Messages = messages;
            Results = results;
            
        }
    }

    public class ResponseMessage
    {
        public string Title { get; set; }
        public string Message { get; set; }
    }


}

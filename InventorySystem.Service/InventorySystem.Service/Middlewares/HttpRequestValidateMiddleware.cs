namespace InventorySystem.Service.Middlewares
{
    public class HttpRequestValidateMiddleware
    {
        private readonly RequestDelegate _next;

        public HttpRequestValidateMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
 
            if (context.Request.Headers.ContainsKey("Authorize-Application"))
            {
                var headerValue = context.Request.Headers["Authorize-Application"].ToString();
                if (headerValue != Constants.App.AuthorizeApp) {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync("Access Denied for this request.");
                    return;
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("Access Denied for this request.");
                return;
            }


            await _next(context);
        }
    }


}

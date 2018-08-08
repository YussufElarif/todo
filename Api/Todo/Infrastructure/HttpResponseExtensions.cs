using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace Todo.Api.Infrastructure
{
    public static class HttpResponseExtensions
    {
        public static void AddCorsHeaders(this HttpResponse response)
        {
            if (!response.Headers.ContainsKey("Access-Control-Allow-Origin"))
            {
                response.Headers.Add("Access-Control-Allow-Origin", new StringValues("*"));
            }

            if (!response.Headers.ContainsKey("Access-Control-Allow-Methods"))
            {
                response.Headers.Add("Access-Control-Allow-Methods", new StringValues(new string[] { "GET", "PUT", "POST", "DELETE", "OPTIONS" }));
            }

            if (!response.Headers.ContainsKey("Access-Control-Allow-Credentials"))
            {
                response.Headers.Add("Access-Control-Allow-Credentials", new StringValues("true"));
            }
        }
    }
}

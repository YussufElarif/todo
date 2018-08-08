using System;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Todo.Api.Infrastructure
{
    public class UnhandledExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<UnhandledExceptionFilter> _logger;

        public UnhandledExceptionFilter(ILogger<UnhandledExceptionFilter> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public void OnException(ExceptionContext context)
        {
            HttpStatusCode status;
            string message;

            var exceptionType = context.Exception.GetType();
            if (exceptionType == typeof(UnauthorizedAccessException))
            {
                message = "Unauthorized Access";
                status = HttpStatusCode.Unauthorized;
            }
            else if (exceptionType == typeof(NotImplementedException))
            {
                message = "A Server Error Occured";
                status = HttpStatusCode.NotImplemented;
            }
            else
            {
                message = context.Exception.ToString();
                status = HttpStatusCode.InternalServerError;
            }

            context.ExceptionHandled = true;

            var response = context.HttpContext.Response;
            response.StatusCode = (int)status;
            response.ContentType = "text/plain";

            response.AddCorsHeaders();

            var err = message + " " + context.Exception.StackTrace;
            response.WriteAsync(err);

            var httpRequest = context.HttpContext.Request;
            _logger.LogError(context.Exception, $"Unhandled exception error (HTTP 500): {httpRequest.Method}, {httpRequest.Path}, {httpRequest.QueryString}");
        }
    }
}

using System.Net;
using Lasmart.DriverRecords.Application.Common;
using Lasmart.DriverRecords.Application.Common.Exceptions;

namespace Lasmart.DriverRecords.Api.Middlewares;

public sealed class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Unhandled exception occurred.");

            var statusCode = exception switch
            {
                ValidationException => HttpStatusCode.BadRequest,
                EntityNotFoundException => HttpStatusCode.NotFound,
                ConcurrencyConflictException => HttpStatusCode.Conflict,
                _ => HttpStatusCode.InternalServerError
            };

            httpContext.Response.StatusCode = (int)statusCode;
            httpContext.Response.ContentType = "application/json";

            var response = ApiResponse<string>.Failure(exception.Message);
            await httpContext.Response.WriteAsJsonAsync(response);
        }
    }
}

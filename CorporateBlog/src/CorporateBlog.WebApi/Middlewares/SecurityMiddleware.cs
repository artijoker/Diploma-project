using Microsoft.Net.Http.Headers;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Responses;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace CorporateBlog.WebApi.Middlewares
{
    public class SecurityMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<SecurityMiddleware> _logger;
        public SecurityMiddleware(RequestDelegate next, ILogger<SecurityMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, SecurityService service)
        {
            var authHeader = context.Request.Headers[HeaderNames.Authorization].FirstOrDefault();

            if (authHeader is not null)
            {
                var token = authHeader.Split(' ')[1];

                var isValidToken = await service.IsValidToken(token);

                if (!isValidToken)
                {
                    _logger.LogWarning("Access token is invalid. Token '{token}'.", token);
                    await context.Response.WriteAsJsonAsync(new Response<object>()
                    {
                        Succeeded = false,
                        Message = $"Токен доступа недействителен.",
                        StatusCode = StatusCodes.Status401Unauthorized
                    });
                    return;
                }
            }

            await _next(context);

            if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
            {
                context.Response.StatusCode = StatusCodes.Status200OK;
                await context.Response.WriteAsJsonAsync(new Response<object>()
                {
                    Succeeded = false,
                    Message = "Неавторизованный доступ!",
                    StatusCode = StatusCodes.Status401Unauthorized
                });
            }
        }
    }
}

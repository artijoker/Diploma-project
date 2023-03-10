using CorporateBlog.Domain.Exceptions;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.WebApi.Middlewares;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;

namespace CorporateBlog.WebApi.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {

        private readonly IHostEnvironment _hostEnvironment;
        private readonly ILogger<ExceptionFilter> _logger;
        public ExceptionFilter(IHostEnvironment hostEnvironment, ILogger<ExceptionFilter> logger)
        {
            _hostEnvironment = hostEnvironment;
            _logger = logger;
        }
            

        public void OnException(ExceptionContext context)
        {
            var message = TryGetMessageFromException(context);
            if (message is not null)
            {
                context.Result = new ObjectResult(
                    new Response<object>()
                    {
                        Succeeded = false,
                        Message = message
                    });
                context.ExceptionHandled = true;
                _logger.LogWarning(context.Exception, context.Exception.Message);
            }
            else
            {
                context.Result = new ObjectResult(
                    new Response<object>()
                    {
                        Succeeded = false,
                        Bug = true,
                        Message = "Неизвестная ошибка.",
                        StatusCode = StatusCodes.Status500InternalServerError
                    });
                _logger.LogError(context.Exception, "UNKNOWN BUG!!! An urgent decision is required.");
            }
            context.ExceptionHandled = true;

        }


        private static string? TryGetMessageFromException(ExceptionContext context)
        {
            return context.Exception switch
            {
                DuplicateEmailException => "Пользователь с таким email уже существует.",
                DuplicateLoginException => "Пользователь с таким логином уже существует.",
                InvalidLoginException => "Неверный логин.",
                InvalidPasswordException => "Неверный пароль.",
                BannedAccountException => "Аккаунт заблокирован.",
                DeletedAccountException => "Аккаунт удален.",
                NotFoundRoleException => "Роль не найдена.",
                DuplicateRoleException => "Роль с таким названием уже существует.",
                DuplicateCategoryException => "Категория с таким названием уже существует.",
                DefaultAdminException => "Невозможно изменить или удалить учетную запись администратора по умолчанию.",
                DefaultRoleException => "Невозможно изменить или удалить роль по умолчанию.",
                DefaultCategoryException => "Невозможно изменить или удалить категорию по умолчанию.",
                BlockeDtokenException => "Токен доступа заблокирован.",
                NotAdminAccountException => "Ошибка авторизации! Выполните вход с помощью учетной записи администратора.",
                _ => null
            };
        }
    }
}

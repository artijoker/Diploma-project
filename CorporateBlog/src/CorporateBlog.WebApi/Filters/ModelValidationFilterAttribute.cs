using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using CorporateBlog.Models.Http.Responses;
using Serilog;

namespace CorporateBlog.WebApi.Filters
{
    public class ModelValidationFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                Log.Warning($"Model validation error by path '{context.HttpContext.Request.Path}'.");

                var problemDetails = new ValidationProblemDetails(context.ModelState);

                var message = "Некорректный запрос. Ошибка валидации.";
                if (problemDetails.Errors.Count == 1 && problemDetails.Errors.Any(e => e.Key == ""))
                    message = $"{message} Тело запроса не должно быть пустым";
                else if (problemDetails.Errors.Count == 1)
                    message = $"{message}. Поле {problemDetails.Errors.First().Key} не должно быть пустым.";
                else
                    message = $"{message}. Поля {string.Join(", ", problemDetails.Errors.Select(e => e.Key))} не должны быть пустыми.";

                context.Result = new ObjectResult(
                    new Response<object>()
                    {
                        Succeeded = false,
                        Message = message,
                        Result = problemDetails,
                        StatusCode = StatusCodes.Status400BadRequest
                    });

            }
        }
    }
}

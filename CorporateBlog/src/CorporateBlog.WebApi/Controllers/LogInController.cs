using Microsoft.AspNetCore.Mvc;
using CorporateBlog.WebApi.Filters;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Requests;
using CorporateBlog.Models.Http.Responses.Authentication;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers
{
    [Route("login")]
    [ModelValidationFilter]
    public class LogInController : ControllerBase
    {
        private readonly AuthorizationService _authorizationService;

        public LogInController(
            AuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }

        [HttpPost("user")]
        public async Task<ActionResult<LogInResponse<AccountDto>>> LogIn([FromBody] LogInRequestModel model)
        {
            var token = await _authorizationService.Authorize(model.Login, model.Password);


            return new LogInResponse<AccountDto>()
            {
                Succeeded = true,
                Token = token
            };
        }

        [HttpPost("admin")]
        public async Task<ActionResult<LogInResponse<AccountDto>>> AdminLogIn([FromBody] LogInRequestModel model)
        {
            var token = await _authorizationService.AdminAuthorize(model.Login, model.Password);

            return new LogInResponse<AccountDto>()
            {
                Succeeded = true,
                Token = token
            };
        }
    }
}

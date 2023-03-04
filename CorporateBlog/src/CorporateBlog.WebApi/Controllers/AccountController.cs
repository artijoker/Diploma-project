using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Requests;
using CorporateBlog.Models.Http.Responses.Authentication;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;
using CorporateBlog.WebApi.Filters;

namespace CorporateBlog.WebApi.Controllers
{
    [Route("accounts")]
    [ModelValidationFilter]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly RegistrationService _registrationService;

        public AccountController(
            AccountService accountService,
            RegistrationService registrationService)
        {
            _accountService = accountService;
            _registrationService = registrationService;
        }

        [HttpGet("get-authors")]
        public async Task<ActionResult<Response<IReadOnlyList<AccountDto>>>> GetAuthors()
        {
            return new Response<IReadOnlyList<AccountDto>>()
            {
                Succeeded = true,
                Result = await _accountService.GetAccountsThatHavePublishedPosts()
            };
        }

        [HttpPost("account/registration")]
        public async Task<ActionResult<LogInResponse<AccountDto>>> RegisterAccount([FromBody] RegistrationRequestModel model)
        {
            var token = await _registrationService.RegisterAccount(model.Email, model.Login, model.Password);
            return new LogInResponse<AccountDto>()
            {
                Succeeded = true,
                Token = token
            };
        }

        [Authorize]
        [HttpGet("account/get-my-account")]
        public async Task<ActionResult<Response<AccountDto>>> GetAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            return new Response<AccountDto>()
            {
                Succeeded = true,
                Result = await _accountService.GetAccountById(id)
            };
        }

        [Authorize]
        [HttpPost("account/edit")]
        public async Task<ActionResult<Response<object>>> UpdateAccount([FromBody] UpdateAccountRequestModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            await _accountService.UserUpdateAccount(id, model.Email, model.Login, model.NewPassword);

            return new Response<object>()
            {
                Succeeded = true,
            };
        }

        [Authorize]
        [HttpGet("account/delete")]
        public async Task<ActionResult<Response<object>>> RemoveAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _accountService.RemoveAccount(id);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [Authorize]
        [HttpGet("get-my-subscriptions")]
        public async Task<ActionResult<Response<IReadOnlyList<AccountDto>>>> GetSubscriptions()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<AccountDto>>()
            {
                Succeeded = true,
                Result = await _accountService.GetSubscriptionsByAccountId(id)
            };
        }

        [Authorize]
        [HttpPost("subscribe-to-author")]
        public async Task<ActionResult<Response<object>>> SubscribeToAuthor([FromBody] int authorAccountId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _accountService.SubscribeToAuthor(id, authorAccountId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [Authorize]
        [HttpPost("unsubscribe-from-author")]
        public async Task<ActionResult<Response<object>>> UnsubscribeFromAuthor([FromBody] int authorAccountId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _accountService.UnsubscribeFromAuthor(id, authorAccountId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }


        [Authorize]
        [HttpPost("check-subscribed-to-author")]
        public async Task<ActionResult<Response<bool>>> CheckSubscribeDtoAuthor([FromBody] int authorAccountId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            return new Response<bool>()
            {
                Succeeded = true,
                Result = await _accountService.IsSubscribeDtoAuthor(id, authorAccountId)
            };
        }
    }
}

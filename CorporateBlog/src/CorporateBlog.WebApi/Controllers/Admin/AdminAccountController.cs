using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CorporateBlog.WebApi.Filters;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Http.Requests.Admin;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers.Admin
{
    [Authorize(Roles = "admin")]
    [Route("admin/accounts")]
    [ModelValidationFilter]
    public class AdminAccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly RegistrationService _registrationService;

        public AdminAccountController(
            AccountService accountService,
            RegistrationService registrationService)
        {
            _accountService = accountService;
            _registrationService = registrationService;
        }

        [HttpPost("account/add")]
        public async Task<ActionResult<Response<object>>> AddNewAccount([FromBody] AdminAccountRequestModel model)
        {
            await _registrationService.AdminAddNewAccount(model.Email, model.Login, model.Password, model.RoleId);

            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("account/get-by-id")]
        public async Task<ActionResult<Response<AccountDto>>> GetAccountsById([FromBody] int accountId)
        {
            return new Response<AccountDto>()
            {
                Succeeded = true,
                Result = await _accountService.GetAccountById(accountId)
            };
        }

        [HttpGet("get-all-accounts")]
        public async Task<ActionResult<Response<IReadOnlyList<AccountDto>>>> GetAllAccounts()
        {
            return new Response<IReadOnlyList<AccountDto>>()
            {
                Succeeded = true,
                Result = await _accountService.GetAllAccounts()
            };
        }

        [HttpPost("account/edit")]
        public async Task<ActionResult<Response<object>>> AdminUpdateAccount([FromBody] AdminUpdateAccountRequestModel model)
        {
            await _accountService.AdminUpdateAccount(model.AccountId, model.Email, model.Login, model.RoleId, model.NewPassword);

            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("account/delete-by-id")]
        public async Task<ActionResult<Response<object>>> RemoveAccount([FromBody] int accountId)
        {
            await _accountService.RemoveAccount(accountId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("account/banned-by-id")]
        public async Task<ActionResult<Response<object>>> BannedAccount([FromBody] int accountId)
        {
            await _accountService.BanAccount(accountId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("account/unlock-by-id")]
        public async Task<ActionResult<Response<object>>> UnlockAccount([FromBody] int accountId)
        {
            await _accountService.UnlockAccount(accountId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

    }
}

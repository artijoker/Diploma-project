using Microsoft.AspNetCore.Identity;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Exceptions;

namespace CorporateBlog.Domain.Services
{
    public class AuthorizationService
    {
        private readonly IUnitOfWork _unit;
        private readonly IPasswordHasher<Account> _hasher;
        private readonly ITokenService _tokenService;

        public AuthorizationService(
            IUnitOfWork unit,
            IPasswordHasher<Account> hasher,
            ITokenService tokenService)
        {
            _unit = unit ?? throw new ArgumentNullException(nameof(unit));
            _hasher = hasher ?? throw new ArgumentNullException(nameof(hasher));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        public async Task<string> Authorize(string login, string password)
        {
            var account = await CheckAccountInfo(login, password);

            return _tokenService.GenerateToken(account.Id, account.Role!.Name);
        }

        public async Task<string> AdminAuthorize(string login, string password)
        {
            var account = await CheckAccountInfo(login, password);

            if (account.RoleId != 1)
                throw new NotAdminAccountException();

            return _tokenService.GenerateToken(account.Id, account.Role!.Name);
        }

        private async Task<Account> CheckAccountInfo(string login, string password)
        {
            var account = await _unit.AccountRepository.FindByLogin(login);

            if (account == null)
                throw new InvalidLoginException();

            var result = _hasher.VerifyHashedPassword(
            account, account.PasswordHash, password);

            if (result == PasswordVerificationResult.Failed)
                throw new InvalidPasswordException();

            if (account.IsDeleted)
                throw new DeletedAccountException();

            if (account.IsBanned)
                throw new BannedAccountException();

            return account;
        }
    }
}

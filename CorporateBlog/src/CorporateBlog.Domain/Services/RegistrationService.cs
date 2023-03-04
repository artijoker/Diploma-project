using Microsoft.AspNetCore.Identity;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain;
using CorporateBlog.Domain.Exceptions;

namespace CorporateBlog.Domain.Services
{
    public class RegistrationService
    {
        private readonly IUnitOfWork _unit;
        private readonly IPasswordHasher<Account> _hasher;
        private readonly ITokenService _tokenService;

        public RegistrationService(
            IUnitOfWork unit,
            IPasswordHasher<Account> hasher,
            ITokenService tokenService)
        {
            _unit = unit ?? throw new ArgumentNullException(nameof(unit));
            _hasher = hasher ?? throw new ArgumentNullException(nameof(hasher));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        public async Task<string> RegisterAccount(string email, string login, string password)
        {
            var role = await _unit.RoleRepository.GetRoleUser();
            var account = await CreateAccount(email, login, password, role);
            await _unit.AccountRepository.Add(account);

            await _unit.SaveChangesAsync();

            account = await _unit.AccountRepository.GetByLogin(account.Login);

            if (account == null)
                throw new InvalidLoginException();

            var token = _tokenService.GenerateToken(account.Id, role.Name);

            return token;
        }

        public async Task AdminAddNewAccount(string email, string login, string password, int roleId)
        {
            var role = await _unit.RoleRepository.GetById(roleId);
            var account = await CreateAccount(email, login, password, role);
            await _unit.AccountRepository.Add(account);
            await _unit.SaveChangesAsync();
        }

        private async Task<Account> CreateAccount(string email, string login, string password, Role role)
        {
            if (await _unit.AccountRepository.IsNoUniqueEmail(email))
                throw new DuplicateEmailException();

            if (await _unit.AccountRepository.IsNoUniqueLogin(login))
                throw new DuplicateLoginException();

            Account account = new()
            {
                Login = login,
                Email = email,
                RoleId = role.Id,
                Role = role,
                Registered = DateTime.Now
            };

            account.PasswordHash = _hasher.HashPassword(account, password);

            return account;
        }
    }
}

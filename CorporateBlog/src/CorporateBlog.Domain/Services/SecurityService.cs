using CorporateBlog.Domain;
using CorporateBlog.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Services
{
    public class SecurityService
    {
        private readonly IUnitOfWork _unit;
        private readonly JwtConfig _jwtConfig;

        public SecurityService(IUnitOfWork unit, JwtConfig jwtConfig)
        {
            _unit = unit;
            _jwtConfig = jwtConfig;
        }

        public async Task<bool> IsValidToken(string token)
        {
            if (await _unit.BlockedJwtTokenRepository.IsBlockedToken(token))
                return false;

            JwtSecurityTokenHandler handler = new();
            JwtSecurityToken jwtSecurityToken = handler.ReadJwtToken(token);

            var claimNameIdentifier = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == handler.OutboundClaimTypeMap[ClaimTypes.NameIdentifier]);
            var claimRole = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == handler.OutboundClaimTypeMap[ClaimTypes.Role]);
            var claimSecret = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == "secret");

            if (claimNameIdentifier is null
                || claimRole is null
                || claimSecret is null)
                return false;

            int accountId = int.Parse(claimNameIdentifier.Value);
            string role = claimRole.Value;
            string secret = claimSecret.Value;

            DateTime expires = jwtSecurityToken.ValidTo;
            var audience = jwtSecurityToken.Audiences.SingleOrDefault();
            string issuer = jwtSecurityToken.Issuer;

            if (secret != _jwtConfig.Secret
                || expires < DateTime.UtcNow
                || issuer is null
                || issuer != _jwtConfig.Issuer
                || audience is null
                || audience != _jwtConfig.Audience)
                return false;

            var account = await _unit.AccountRepository.FindById(accountId);

            if (account == null)
                return false;

            if (account.Role!.Name != role || account.IsBanned || account.IsDeleted)
            {
                var blockedToken = new BlockedJwtToken
                {
                    Token = token,
                    AccountId = account.Id
                };

                await _unit.BlockedJwtTokenRepository.Add(blockedToken);
                await _unit.SaveChangesAsync();

                return false;
            }

            return true;
        }
    }
}

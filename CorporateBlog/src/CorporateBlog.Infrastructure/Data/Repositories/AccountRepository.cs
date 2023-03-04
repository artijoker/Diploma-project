using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class AccountRepository : EfRepository<Account>, IAccountRepository
    {
        private static readonly SemaphoreSlim _semaphore = new(1, 1);

        private readonly IMemoryCache _memoryCache;
        private readonly ILogger<AccountRepository> _logger;
        public AccountRepository(AppDbContext context, IMemoryCache memoryCache, ILogger<AccountRepository> logger) : base(context)
        {
            _memoryCache = memoryCache;
            _logger = logger;
        }

        public override async Task<IReadOnlyList<Account>> GetAll()
            => await Entities.Include(a => a.Role).ToListAsync();

        public async override Task<Account> GetById(int id)
        {
            _memoryCache.TryGetValue($"AccountId:{id}", out Account? account);
            if (account is null)
            {
                try
                {
                    await _semaphore.WaitAsync();

                    _memoryCache.TryGetValue($"AccountId:{id}", out account);
                    if (account is null)
                    {
                        account = await Entities.Where(a => a.Id == id).Include(a => a.Role).FirstAsync();
                        _memoryCache.Set($"AccountId:{account.Id}",
                            account,
                            new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromSeconds(30))
                            );
                        _logger.LogInformation("Adding account to cache: {account}", account);
                    }
                    else
                    {
                        _dbContext.Attach(account);
                    }
                }
                finally
                {
                    _semaphore.Release();
                }
            }
            else
            {
                _dbContext.Attach(account);
            }
            return account;
        }

        public async override Task<Account?> FindById(int id)
        {
            _memoryCache.TryGetValue($"AccountId:{id}", out Account? account);


            if (account is null)
            {
                try
                {
                    await _semaphore.WaitAsync();

                    _memoryCache.TryGetValue($"AccountId:{id}", out account);
                    if (account is null)
                    {
                        account = await Entities.Where(a => a.Id == id).Include(a => a.Role).FirstOrDefaultAsync();

                        if (account is not null)
                            _memoryCache.Set($"AccountId:{account.Id}",
                                account,
                                new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromSeconds(30))
                                );
                        _logger.LogInformation("Adding account to cache: {account}", account);
                    }
                    else
                    {
                        _dbContext.Attach(account);
                    }
                }
                finally
                {
                    _semaphore.Release();
                }
            }
            else
            {
                _dbContext.Attach(account);
            }
            return account;
        }

        public override async Task Update(Account account)
        {
            try
            {
                await _semaphore.WaitAsync();

                _memoryCache.Remove($"AccountId:{account.Id}");
            }
            finally
            {
                _semaphore.Release();
            }

            Entities.Update(account);
        }

        public Task<Account?> FindByLogin(string login)
            => Entities.Where(a => a.Login == login).Include(a => a.Role).FirstOrDefaultAsync();


        public Task<Account> GetByEmail(string email)
            => Entities.Where(a => a.Email == email).Include(a => a.Role).FirstAsync();

        public Task<Account> GetByLogin(string login)
            => Entities.Where(a => a.Login == login).Include(a => a.Role).FirstAsync();

        public Task<bool> IsNoUniqueEmail(string email)
            => Entities.AnyAsync(a => a.Email == email);

        public Task<bool> IsNoUniqueLogin(string login)
            => Entities.AnyAsync(a => a.Login == login);

        public override Task Remove(Account entity)
            => Task.CompletedTask;

        public override Task RemoveRange(params Account[] entities)
            => Task.CompletedTask;

        public async Task<IReadOnlyList<Account>> GetAccountsThatHavePostsWithStatus(string status)
            => await Entities.Where(a => a.Posts.Any(p => p.Status == status) && a.IsDeleted == false && a.IsBanned == false)
                .Include(a => a.Role)
                .ToListAsync();


    }
}

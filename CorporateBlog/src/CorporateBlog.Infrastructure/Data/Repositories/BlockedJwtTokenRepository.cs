using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class BlockedJwtTokenRepository : EfRepository<BlockedJwtToken>, IBlockedJwtTokenRepository
    {
        private const string Key = "BlockedJwtTokens";
        private readonly IMemoryCache _memoryCache;
        private static readonly SemaphoreSlim _semaphore = new(1, 1);

        public BlockedJwtTokenRepository(AppDbContext context, IMemoryCache memoryCache) : base(context)
        {
            _memoryCache = memoryCache;
        }

        public async override Task Add(BlockedJwtToken token)
        {
            if (await Entities.AnyAsync(e => e.Token == token.Token && e.AccountId == token.AccountId))
                return;
            try
            {
                await _semaphore.WaitAsync();
                _memoryCache.Remove(Key);
            }
            finally
            {
                _semaphore.Release();
            }
            
            await base.Add(token);
        }

        public async Task<bool> IsBlockedToken(string token)
        {
            _memoryCache.TryGetValue(Key, out IReadOnlyList<BlockedJwtToken>? tokens);
            if (tokens is null)
            {
                try
                {
                    await _semaphore.WaitAsync();

                    _memoryCache.TryGetValue(Key, out tokens);
                    if (tokens is null)
                    {
                        tokens = await base.GetAll();
                        _memoryCache.Set(Key,
                            tokens,
                            new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(1))
                            );
                    }
                }
                finally
                {
                    _semaphore.Release();
                }

            }
            return tokens.Any(t => t.Token == token);
        }
    }
}

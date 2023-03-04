using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class DislikeRepository : EfRepository<Dislike>, IDislikeRepository
    {
        public DislikeRepository(AppDbContext context) : base(context)
        {
        }

        public Task<int> CountDislikesByAccountId(int accountId)
            => Entities.CountAsync(d => d.AccountId == accountId);
        

        public Task<int> CountDislikesByPostId(int postId)
            => Entities.CountAsync(d => d.PostId == postId);

        public Task<Dislike> GetDislikeByAccountIdAndPostId(int accountId, int postId)
            => Entities.FirstAsync(d => d.AccountId == accountId && d.PostId == postId);

        public async Task<IReadOnlyList<Dislike>> GetDislikesByAccountId(int accountId)
            => await Entities.Where(d => d.AccountId == accountId).ToListAsync();


        public async Task<IReadOnlyList<Dislike>> GetDislikesByPostId(int postId)
            => await Entities.Where(d => d.PostId == postId).ToListAsync();

        public Task<bool> IsHaveDislikeByAccountIdAndPostId(int accountId, int postId)
            => Entities.AnyAsync(d => d.AccountId == accountId && d.PostId == postId);

        public Task RemoveDislikesByAccountId(int accountId)
        {
            Entities.RemoveRange(Entities.Where(l => l.AccountId == accountId).ToList());
            return Task.CompletedTask;
        }

        public Task RemoveDislikesByPostId(int postId)
        {
            Entities.RemoveRange(Entities.Where(l => l.PostId == postId).ToList());
            return Task.CompletedTask;
        }
    }
}

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
    public class LikeRepository : EfRepository<Like>, ILikeRepository
    {
        public LikeRepository(AppDbContext context) : base(context)
        {
        }

        public Task<int> CountLikesByAccountId(int accountId)
            => Entities.CountAsync(l => l.AccountId == accountId);
        

        public Task<int> CountLikesByPostId(int postId)
            => Entities.CountAsync(l => l.PostId == postId);
        

        public Task<Like> GetLikeByAccountIdAndPostId(int accountId, int postId)
            => Entities.FirstAsync(l => l.AccountId == accountId && l.PostId == postId);

        public async Task<IReadOnlyList<Like>> GetLikesByAccountId(int accountId)
            => await Entities.Where(l => l.AccountId == accountId).ToListAsync();


        public async Task<IReadOnlyList<Like>> GetLikesByPostId(int postId)
            => await Entities.Where(l => l.PostId == postId).ToListAsync();

        public Task<bool> IsHaveLikeByAccountIdAndPostId(int accountId, int postId)
            => Entities.AnyAsync(l => l.AccountId == accountId && l.PostId == postId);

        public Task RemoveLikesByAccountId(int accountId)
        {
            Entities.RemoveRange(Entities.Where(l => l.AccountId == accountId).ToList());
            return Task.CompletedTask;
        }

        public Task RemoveLikesByPostId(int postId)
        {
            Entities.RemoveRange(Entities.Where(l => l.PostId == postId).ToList());
            return Task.CompletedTask;
        }
    }
}

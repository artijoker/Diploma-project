using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class ComplaintOnPostRepository : EfRepository<ComplaintOnPost>, IComplaintOnPostRepository
    {
        public ComplaintOnPostRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<IReadOnlyList<ComplaintOnPost>> GetAll()
        => await Entities.Where(c => c.IsDeleted == false).Include(c => c.Account).ToListAsync();

        public Task<int> CountComplaints()
           => Entities.CountAsync();

        public Task<int> CountComplaintsByAccountId(int accountId)
            => Entities.CountAsync(c => c.AccountId == accountId);

        public Task<int> CountComplaintsByPostId(int postId)
            => Entities.CountAsync(c => c.PostId == postId);

        public async Task<IReadOnlyList<ComplaintOnPost>> GetComplaintsByAccountId(int accountId)
            => await Entities.Where(c => c.AccountId == accountId)
            .Include(c => c.Account)
            .ToListAsync();

        public async Task<IReadOnlyList<ComplaintOnPost>> GetComplaintsByPostId(int postId)
            => await Entities.Where(c => c.PostId == postId)
            .Include(c => c.Account)
            .ToListAsync();

        public override Task Remove(ComplaintOnPost entity) 
            => Task.CompletedTask;

        public override Task RemoveRange(params ComplaintOnPost[] entities) 
            => Task.CompletedTask;
    }
}

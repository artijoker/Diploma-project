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
    public class ComplaintOnCommentRepository : EfRepository<ComplaintOnComment>, IComplaintOnCommentRepository
    {
        public ComplaintOnCommentRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<IReadOnlyList<ComplaintOnComment>> GetAll()
            => await Entities.Where(c => c.IsDeleted == false).Include(c => c.Account).ToListAsync();

        public Task<int> CountComplaints()
           => Entities.CountAsync();
        public Task<int> CountComplaintsByAccountId(int accountId)
            => Entities.CountAsync(c => c.AccountId == accountId);

        public Task<int> CountComplaintsByCommentId(int commentId)
            => Entities.CountAsync(c => c.CommentId == commentId);

        public async Task<IReadOnlyList<ComplaintOnComment>> GetComplaintsByAccountId(int accountId)
            => await Entities.Where(c => c.AccountId == accountId)
            .Include(c => c.Account)
            .ToListAsync();

        public async Task<IReadOnlyList<ComplaintOnComment>> GetComplaintsByCommentId(int commentId)
            => await Entities.Where(c => c.CommentId == commentId)
            .Include(c => c.Account)
            .ToListAsync();

        public override Task Remove(ComplaintOnComment entity) 
            => Task.CompletedTask;

        public override Task RemoveRange(params ComplaintOnComment[] entities) 
            => Task.CompletedTask;
    }
}

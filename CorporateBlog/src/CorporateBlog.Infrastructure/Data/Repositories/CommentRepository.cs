using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class CommentRepository : EfRepository<Comment>, ICommentRepository
    {
        public CommentRepository(AppDbContext context) : base(context)
        {
        }

        public override Task<Comment?> FindById(int id) 
            => Entities.Where(c => c.Id == id)
                .Include(c => c.Account)
                .FirstOrDefaultAsync();


        public override Task<Comment> GetById(int id) 
            => Entities.Where(c => c.Id == id)
                .Include(c => c.Account)
                .FirstAsync();

        
        public async override Task<IReadOnlyList<Comment>> GetAll()
            => await Entities
                .Include(c => c.Account)
                .Include(c => c.Post)
                .ToListAsync();

        public async Task<IReadOnlyList<Comment>> GetCommentsByAccountId(int accountId) 
            => await Entities.Where(c => c.AccountId == accountId && c.IsDeleted == false)
                .Include(c => c.Account)
                .Include(c => c.Post)
                .ToListAsync();

        public async Task<IReadOnlyList<Comment>> GetCommentsByPostId(int postId) 
            => await Entities.Where(c => c.PostId == postId && c.IsDeleted == false)
                .Include(c => c.Account)
                .ToListAsync();

        public override Task Remove(Comment entity) 
            => Task.CompletedTask;

        public override Task RemoveRange(params Comment[] entities) 
            => Task.CompletedTask;

        public async Task<IReadOnlyList<Comment>> GetDeletedCommentsByAccountId(int accountId) 
            => await Entities.Where(c => c.AccountId == accountId && c.IsDeleted == true).ToListAsync();

        public async Task<IReadOnlyList<Comment>> GetDeletedCommentsByPostId(int postId) 
            => await Entities.Where(c => c.PostId == postId && c.IsDeleted == true).ToListAsync();

        public Task<int> CountCommentsByPostId(int postId) 
            => Entities.CountAsync(c => c.PostId == postId && c.IsDeleted == false);

        public Task<int> CountCommentsByAccountId(int accountId) 
            => Entities.CountAsync(c => c.AccountId == accountId && c.IsDeleted == false);
    }

}

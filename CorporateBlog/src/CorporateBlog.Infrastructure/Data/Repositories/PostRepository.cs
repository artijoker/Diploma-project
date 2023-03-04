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
    public class PostRepository : EfRepository<Post>, IPostRepository
    {
        public PostRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<Post?> FindById(int id)
            => await Entities.Where(p => p.Id == id)
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .FirstOrDefaultAsync();


        public override async Task<Post> GetById(int id)
            => await Entities.Where(p => p.Id == id)
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .FirstAsync(it => it.Id == id);


        public async Task<IReadOnlyList<Post>> GetPostsByAccountIdAndStatus(int accountId, string status)
            => await Entities.Where(p => p.AccountId == accountId && p.Status == status && !p.IsDeleted)
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .ToListAsync();




        public async Task<IReadOnlyList<Post>> GetPostsByCategoryIdAndStatus(int categoryId, string status)
            => await Entities.Where(p => p.CategoryId == categoryId && p.Status == status && !p.IsDeleted)
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .ToListAsync();




        public async Task<IReadOnlyList<Post>> GetPostsByStatus(string status)
            => await Entities.Where(p => p.Status == status && !p.IsDeleted)
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .ToListAsync();



        public async Task<IReadOnlyList<Post>> GetPostsByAccountId(int accountId)
            => await Entities.Where(p => p.AccountId == accountId && !p.IsDeleted)
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .ToListAsync();


        public async Task<IReadOnlyList<Post>> GetPostsByCategoryId(int categoryId)
            => await Entities.Where(p => p.CategoryId == categoryId && !p.IsDeleted)
               .Include(p => p.Account)
               .Include(p => p.Сategory)
               .ToListAsync();

        public Task<int> CountPostsByAccountId(int accountId)
            => Entities.CountAsync(p => p.AccountId == accountId && !p.IsDeleted);

        public Task<int> CountPostsByCategoryId(int categoryId)
            => Entities.CountAsync(p => p.CategoryId == categoryId && !p.IsDeleted);

        public Task<int> CountPostsByStatus(string status)
            => Entities.CountAsync(p => p.Status == status && !p.IsDeleted);

        public Task<int> CountPostsByAccountIdAndStatus(int accountId, string status)
            => Entities.CountAsync(p => p.AccountId == accountId && p.Status == status && !p.IsDeleted);

        public Task<int> CountPostsByCategoryIdAndStatus(int categoryId, string status)
            => Entities.CountAsync(p => p.CategoryId == categoryId && p.Status == status && !p.IsDeleted);


        public override Task Remove(Post entity)
            => Task.CompletedTask;

        public override Task RemoveRange(params Post[] entities)
            => Task.CompletedTask;

        public async Task<IReadOnlyList<Post>> FindPostsBySubstringAndStatus(string substring, string status)
            => await Entities.Where(p => p.Status == status)
                .Where(p => p.Title.Contains(substring) || p.Anons.Contains(substring))
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .ToListAsync();

        public async Task<IReadOnlyList<Post>> GetLikedPostsByAccountId(int accountId)
         => await Entities.Where(p => p.Likes.Any(l => l.AccountId == accountId))
                .Include(p => p.Account)
                .Include(p => p.Сategory)
                .ToListAsync();

    }
}

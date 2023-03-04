using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CorporateBlog.Domain.Repositories
{
    public interface IDislikeRepository : IRepository<Dislike>
    {
        Task<int> CountDislikesByPostId(int postId);
        Task<int> CountDislikesByAccountId(int accountId);
        Task<IReadOnlyList<Dislike>> GetDislikesByPostId(int postId);
        Task<IReadOnlyList<Dislike>> GetDislikesByAccountId(int accountId);
        Task<Dislike> GetDislikeByAccountIdAndPostId(int accountId, int postId);

        Task RemoveDislikesByAccountId(int accountId);
        Task RemoveDislikesByPostId(int postId);
        Task<bool> IsHaveDislikeByAccountIdAndPostId(int accountId, int postId);


    }
}

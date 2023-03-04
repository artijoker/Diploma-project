using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface ILikeRepository : IRepository<Like>
    {
        Task<int> CountLikesByPostId(int postId);
        Task<int> CountLikesByAccountId(int accountId);

        Task<IReadOnlyList<Like>> GetLikesByPostId(int postId);
        Task<IReadOnlyList<Like>> GetLikesByAccountId(int accountId);
        Task<Like> GetLikeByAccountIdAndPostId(int accountId, int postId);
        Task RemoveLikesByPostId(int postId);
        Task RemoveLikesByAccountId(int accountId);

        Task<bool> IsHaveLikeByAccountIdAndPostId(int accountId, int postId);


    }
}

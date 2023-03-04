using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface ICommentRepository : IRepository<Comment>
    {
        Task<IReadOnlyList<Comment>> GetCommentsByAccountId(int accountId);
        Task<IReadOnlyList<Comment>> GetCommentsByPostId(int postId);
        Task<IReadOnlyList<Comment>> GetDeletedCommentsByAccountId(int accountId);
        Task<IReadOnlyList<Comment>> GetDeletedCommentsByPostId(int postId);

        Task<int> CountCommentsByPostId(int postId);
        Task<int> CountCommentsByAccountId(int accountId);
    }
}

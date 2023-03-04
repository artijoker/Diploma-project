using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface IPostRepository : IRepository<Post>
    {

        Task<IReadOnlyList<Post>> GetPostsByStatus(string status);
        Task<IReadOnlyList<Post>> GetPostsByAccountId(int accountId);
        Task<IReadOnlyList<Post>> GetPostsByCategoryId(int categoryId);

        Task<IReadOnlyList<Post>> GetPostsByAccountIdAndStatus(int accountId, string status);
        Task<IReadOnlyList<Post>> GetPostsByCategoryIdAndStatus(int categoryId, string status);


        Task<int> CountPostsByAccountId(int accountId);
        Task<int> CountPostsByCategoryId(int categoryId);
        Task<int> CountPostsByStatus(string status);
        Task<int> CountPostsByAccountIdAndStatus(int accountId, string status);
        Task<int> CountPostsByCategoryIdAndStatus(int categoryId, string status);

        Task<IReadOnlyList<Post>> FindPostsBySubstringAndStatus(string substring, string status);

        Task<IReadOnlyList<Post>> GetLikedPostsByAccountId(int accountId);
    }
}

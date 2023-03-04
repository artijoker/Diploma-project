using CorporateBlog.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain
{
    public interface IUnitOfWork : IDisposable
    {
        IAccountRepository AccountRepository { get; }
        ICommentRepository CommentRepository { get; }
        IComplaintOnCommentRepository ComplaintOnCommentRepository { get; }
        IRoleRepository RoleRepository { get; }
        IPostRepository PostRepository { get; }
        ILikeRepository LikeRepository { get; }
        IDislikeRepository DislikeRepository { get; }
        IComplaintOnPostRepository ComplaintOnPostRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IBlockedJwtTokenRepository BlockedJwtTokenRepository { get; }
        ISubscriptionRepository SubscriptionRepository { get; }

        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}

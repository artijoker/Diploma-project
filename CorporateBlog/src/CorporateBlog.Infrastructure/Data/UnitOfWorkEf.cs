using CorporateBlog.Domain;
using CorporateBlog.Domain.Repositories;

namespace CorporateBlog.Infrastructure.Data
{
    public class UnitOfWorkEf : IUnitOfWork, IAsyncDisposable
    {
        private readonly AppDbContext _dbContext;

        public IAccountRepository AccountRepository { get; }
        public ICommentRepository CommentRepository { get; }
        public IComplaintOnCommentRepository ComplaintOnCommentRepository { get; }
        public IRoleRepository RoleRepository { get; }
        public IPostRepository PostRepository { get; }
        public ILikeRepository LikeRepository { get; }
        public IDislikeRepository DislikeRepository { get; }
        public IComplaintOnPostRepository ComplaintOnPostRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IBlockedJwtTokenRepository BlockedJwtTokenRepository { get; }
        public ISubscriptionRepository SubscriptionRepository { get; }




        public UnitOfWorkEf(
            AppDbContext dbContext,
            IAccountRepository accountRepository,
            ICommentRepository commentRepository,
            IComplaintOnCommentRepository complaintOnCommentRepository,
            IRoleRepository roleRepository,
            IPostRepository postRepository,
            ILikeRepository likeToPostRepository,
            IDislikeRepository dislikeToPostRepository,
            IComplaintOnPostRepository complaintOnPostRepository,
            ICategoryRepository categoryRepository,
            IBlockedJwtTokenRepository jwtTokenRepository,
            ISubscriptionRepository subscriptionRepository

            )
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            AccountRepository = accountRepository ?? throw new ArgumentNullException(nameof(accountRepository));
            CommentRepository = commentRepository ?? throw new ArgumentNullException(nameof(commentRepository));
            ComplaintOnCommentRepository = complaintOnCommentRepository ?? throw new ArgumentNullException(nameof(complaintOnCommentRepository));
            RoleRepository = roleRepository ?? throw new ArgumentNullException(nameof(roleRepository));
            PostRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
            LikeRepository = likeToPostRepository ?? throw new ArgumentNullException(nameof(likeToPostRepository));
            DislikeRepository = dislikeToPostRepository ?? throw new ArgumentNullException(nameof(dislikeToPostRepository));
            ComplaintOnPostRepository = complaintOnPostRepository ?? throw new ArgumentNullException(nameof(complaintOnPostRepository));
            CategoryRepository = categoryRepository ?? throw new ArgumentNullException(nameof(categoryRepository));
            BlockedJwtTokenRepository = jwtTokenRepository ?? throw new ArgumentNullException(nameof(jwtTokenRepository));
            SubscriptionRepository = subscriptionRepository ?? throw new ArgumentNullException(nameof(subscriptionRepository));
        }

        public void Dispose() => _dbContext.Dispose();

        public ValueTask DisposeAsync() => _dbContext.DisposeAsync();

        public Task SaveChangesAsync(CancellationToken cancellationToken = default)
            => _dbContext.SaveChangesAsync(cancellationToken);
    }
}

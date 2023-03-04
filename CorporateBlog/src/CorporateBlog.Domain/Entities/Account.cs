namespace CorporateBlog.Domain.Entities
{
    public class Account : IEntity
    {
        public int Id { get; set; }

        public string Login { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime Registered { get; set; }
        public bool IsBanned { get; set; } = false;
        public bool IsDeleted { get; set; } = false;
        public int RoleId { get; set; }

        public Role? Role { get; set; }

        public ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();
        public ICollection<Post> Posts { get; set; } = new HashSet<Post>();
        public ICollection<BlockedJwtToken> Tokens { get; set; } = new HashSet<BlockedJwtToken>();
        public ICollection<ComplaintOnComment> ComplaintsOnComments { get; set; } = new HashSet<ComplaintOnComment>();
        public ICollection<ComplaintOnPost> ComplaintsOnPosts { get; set; } = new HashSet<ComplaintOnPost>();
        public ICollection<Like> Likes { get; set; } = new HashSet<Like>();
        public ICollection<Dislike> Dislikes { get; set; } = new HashSet<Dislike>();

        public ICollection<Subscription> Subscriptions { get; set; } = new HashSet<Subscription>();
        public ICollection<Subscription> Subscribers { get; set; } = new HashSet<Subscription>();
    }
}

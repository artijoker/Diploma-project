namespace CorporateBlog.Domain.Entities
{
    public static class PostStatus
    {
        public const string Draft = "Draft";
        public const string Pending = "Pending";
        public const string Published = "Published";
        public const string Rejected = "Rejected";
        public const string InTrash = "InTrash";
    }

    public class Post : IEntity
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
        public string Anons { get; set; } = null!;
        public string FullText { get; set; } = null!;
        public DateTime LastChange { get; set; }
        public string Status { get; set; } = null!;
        public bool IsDeleted { get; set; } = false;
        public int AccountId { get; set; }
        public int CategoryId { get; set; }

        public Account? Account { get; set; }

        public Category? Сategory { get; set; }
        public ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();
        public ICollection<ComplaintOnPost> Complaints { get; set; } = new HashSet<ComplaintOnPost>();
        public ICollection<Like> Likes { get; set; } = new HashSet<Like>();
        public ICollection<Dislike> Dislikes { get; set; } = new HashSet<Dislike>();
    }
}

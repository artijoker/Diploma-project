namespace CorporateBlog.Domain.Entities
{
    public class Comment : IEntity
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;
        public DateTime Created { get; set; }
        public int AccountId { get; set; }
        public int PostId { get; set; }
        public bool IsDeleted { get; set; } = false;

        public Account? Account { get; set; }
        public Post? Post { get; set; }

        public ICollection<ComplaintOnComment> Complaints { get; set; } = new HashSet<ComplaintOnComment>();
    }
}

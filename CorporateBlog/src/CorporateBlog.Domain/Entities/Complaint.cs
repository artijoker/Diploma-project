namespace CorporateBlog.Domain.Entities
{
    public abstract class Complaint : IEntity
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public DateTime Created { get; set; }
        public int AccountId { get; set; }
        public bool IsDeleted { get; set; } = false;

        public Account? Account { get; set; }
    }
}

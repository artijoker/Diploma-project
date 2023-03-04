namespace CorporateBlog.Domain.Entities
{
    public class Category : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<Post> Posts { get; set; } = new HashSet<Post>();
    }
}

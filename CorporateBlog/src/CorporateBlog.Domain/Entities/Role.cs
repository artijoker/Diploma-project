namespace CorporateBlog.Domain.Entities
{
    public class Role : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public ICollection<Account> Accounts { get; set; } = new HashSet<Account>();
    }
}

namespace CorporateBlog.Domain.Entities
{
    public class BlockedJwtToken : IEntity
    {
        public int Id { get; set; }
        public string Token { get; set; } = null!;
        public int AccountId { get; set; }

        public Account? Account { get; set; }
    }
}

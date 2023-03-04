namespace CorporateBlog.Domain.Entities
{
    public class Subscription : IEntity
    {
        public int Id { get; set; }

        public int SubscriberAccountId { get; set; }
        public int AuthorAccountId { get; set; }

        public Account? SubscriberAccount { get; set; }
        public Account? AuthorAccount { get; set; }
    }
}

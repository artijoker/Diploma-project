namespace CorporateBlog.Domain.Entities
{
    public interface ILike : IEntity
    {
        public DateTime Created { get; set; }
        public int PostId { get; set; }
        public int AccountId { get; set; }

        public Account? Account { get; set; }
        public Post? Post { get; set; }
    }
}

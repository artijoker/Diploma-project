namespace CorporateBlog.Domain.Entities
{
    public class ComplaintOnPost : Complaint
    {
        public int PostId { get; set; }
        public Post? Post { get; set; }
    }
}

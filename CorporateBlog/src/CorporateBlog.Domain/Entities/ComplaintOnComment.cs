namespace CorporateBlog.Domain.Entities
{
    public class ComplaintOnComment : Complaint
    {
        public int CommentId { get; set; }
        public Comment? Comment { get; set; }
    }
}

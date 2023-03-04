using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Dto
{
    public class PostDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Anons { get; set; }
        public string? FullText { get; set; }
        public DateTime LastChange { get; set; }
        public string? Status { get; set; }
        public int AuthorId { get; set; }
        public int CategoryId { get; set; }
        public string? AuthorNickname { get; set; }
        public string? CategoryName { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public int CommentsNumber { get; set; }
        public bool IsDeleted { get; set; }

    }
}

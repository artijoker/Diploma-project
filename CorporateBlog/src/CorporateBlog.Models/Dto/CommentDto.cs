using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Dto
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public DateTime Created { get; set; }
        public int AccountId { get; set; }
        public int PostId { get; set; }
        public string? AccountNickname { get; set; }
        public string? PostTitle { get; set; }
        public bool IsDeleted { get; set; }
    }
}

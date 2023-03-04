using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Requests
{
    public class UpdateCommentRequestsModel
    {
        [Required]
        public int CommentId { get; set; }

        [Required]
        public string NewText { get; set; } = string.Empty;
    }
}

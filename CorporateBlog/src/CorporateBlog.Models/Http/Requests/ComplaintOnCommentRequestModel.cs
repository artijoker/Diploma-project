using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Requests
{
    public class ComplaintOnCommentRequestModel : ComplaintRequestModel
    {
        [Required]
        public int CommentId { get; set; }
    }
}

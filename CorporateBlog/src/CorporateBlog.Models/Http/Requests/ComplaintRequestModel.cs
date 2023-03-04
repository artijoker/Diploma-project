using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Requests
{
    public abstract class ComplaintRequestModel
    {
        [Required]
        public string Text { get; set; } = string.Empty;
    }
}

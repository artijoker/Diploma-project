using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Requests
{
    public class PostRequestsModel
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Anons { get; set; } = string.Empty;

        [Required]
        public string FullText { get; set; } = string.Empty;

        [Required]
        public int CategoryId { get; set; }
    }
}

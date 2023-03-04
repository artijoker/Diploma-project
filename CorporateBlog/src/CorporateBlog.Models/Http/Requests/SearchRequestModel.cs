using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Requests
{
    public class SearchRequestModel
    {
        [Required]
        public string Substring { get; set; } = string.Empty;
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Requests
{
    public class UpdateAccountRequestModel
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Login { get; set; } = string.Empty;

        public string? NewPassword { get; set; }
    }
}

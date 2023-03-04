using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Requests.Admin
{
    public class AdminUpdateAccountRequestModel : UpdateAccountRequestModel
    {
        [Required]
        public int AccountId { get; set; }

        [Required]
        public int RoleId { get; set; }
    }
}

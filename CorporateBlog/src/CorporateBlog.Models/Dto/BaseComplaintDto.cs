using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Dto
{
    public class BaseComplaintDto
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public DateTime Created { get; set; }
        public int AccountId { get; set; }
        public string? AccountNickname { get; set; }
    }
}

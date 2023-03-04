using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Dto
{
    public class AccountDto
    {
        public int Id { get; set; }
        public string? LoginNickName { get; set; }
        public string? Email { get; set; }
        public DateTime Registered { get; set; }
        public int QuantityPublishedPosts { get; set; }
        public int QuantitySubscriptions { get; set; }
        public int QuantitySubscribers { get; set; }
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public bool IsBanned { get; set; }
        public bool IsDeleted { get; set; }
    }
}

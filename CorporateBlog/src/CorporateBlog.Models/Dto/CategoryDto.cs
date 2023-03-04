using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Dto
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int QuantityPublishedPosts { get; set; }
    }
}

using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<bool> IsUniqueName(string name);

    }
}

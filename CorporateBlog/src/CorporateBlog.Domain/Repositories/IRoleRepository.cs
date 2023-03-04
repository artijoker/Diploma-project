using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<Role> GetRoleUser();
        Task<Role> GetRoleAdmin();
    }
}

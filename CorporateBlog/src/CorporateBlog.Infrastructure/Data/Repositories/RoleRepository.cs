using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class RoleRepository : EfRepository<Role>, IRoleRepository
    {
        public RoleRepository(AppDbContext context) : base(context)
        {
        }

        public Task<Role> GetRoleUser() 
            => _dbContext.Roles.FirstAsync(r => r.Name == "user");

        public Task<Role> GetRoleAdmin() 
            => _dbContext.Roles.FirstAsync(r => r.Name == "admin");
    }
}

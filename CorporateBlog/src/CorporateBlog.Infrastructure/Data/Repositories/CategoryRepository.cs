using CorporateBlog.Models.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class CategoryRepository : EfRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }

        public Task<bool> IsUniqueName(string name) 
            => Entities.AnyAsync(c => c.Name == name);
    }
}

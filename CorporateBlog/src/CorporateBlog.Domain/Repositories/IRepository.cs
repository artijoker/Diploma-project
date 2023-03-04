﻿using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface IRepository<TEntity> where TEntity : IEntity
    {
        Task<TEntity> GetById(int id);
        Task<TEntity?> FindById(int id);
        Task Add(TEntity entity);
        Task Update(TEntity entity);
        Task UpdateRange(params TEntity[] entities);
        Task Remove(TEntity entity);
        Task RemoveRange(params TEntity[] entities);
        Task<IReadOnlyList<TEntity>> GetAll();
    }
}

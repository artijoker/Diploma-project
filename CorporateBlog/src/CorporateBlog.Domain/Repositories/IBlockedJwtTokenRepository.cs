using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface IBlockedJwtTokenRepository : IRepository<BlockedJwtToken>
    {
        Task<bool> IsBlockedToken(string token);
    }
}

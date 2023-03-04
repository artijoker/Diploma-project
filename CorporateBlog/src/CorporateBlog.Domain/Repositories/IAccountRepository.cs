using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<Account> GetByEmail(string email);
        Task<Account> GetByLogin(string login);
        Task<Account?> FindByLogin(string login);
        Task<bool> IsNoUniqueEmail(string email);
        Task<bool> IsNoUniqueLogin(string login);

        Task<IReadOnlyList<Account>> GetAccountsThatHavePostsWithStatus(string status);
    }
}

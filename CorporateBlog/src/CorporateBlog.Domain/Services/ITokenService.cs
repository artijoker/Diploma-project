using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Services
{
    public interface ITokenService
    {
        string GenerateToken(int accountId, string role);
    }
}

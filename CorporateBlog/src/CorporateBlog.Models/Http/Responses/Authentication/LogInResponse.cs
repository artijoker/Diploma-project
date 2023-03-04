using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Models.Http.Responses.Authentication
{
    public class LogInResponse<TObject> : Response<TObject>
    {
        public string Token { get; set; } = string.Empty;
    }
}

using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface IComplaintOnPostRepository : IRepository<ComplaintOnPost>
    {
        Task<IReadOnlyList<ComplaintOnPost>> GetComplaintsByPostId(int postId);
        Task<IReadOnlyList<ComplaintOnPost>> GetComplaintsByAccountId(int accountId);

        Task<int> CountComplaints();
        Task<int> CountComplaintsByPostId(int postId);
        Task<int> CountComplaintsByAccountId(int accountId);
    }
}

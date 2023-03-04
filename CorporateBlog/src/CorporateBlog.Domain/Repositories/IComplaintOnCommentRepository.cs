using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface IComplaintOnCommentRepository : IRepository<ComplaintOnComment>
    {
        Task<IReadOnlyList<ComplaintOnComment>> GetComplaintsByCommentId(int commentId);
        Task<IReadOnlyList<ComplaintOnComment>> GetComplaintsByAccountId(int accountId);

        Task<int> CountComplaints();
        Task<int> CountComplaintsByCommentId(int commentId);
        Task<int> CountComplaintsByAccountId(int accountId);


    }
}

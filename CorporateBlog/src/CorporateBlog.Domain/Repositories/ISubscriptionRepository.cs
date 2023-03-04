using CorporateBlog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Domain.Repositories
{
    public interface ISubscriptionRepository : IRepository<Subscription>
    {
        Task<Subscription> GetSubscriptionBySubscriberAccountIdAndAuthorAccountId(int subscriberAccountId, int authorAccountId);
        Task<Subscription?> FindSubscriptionBySubscriberAccountIdAndAuthorAccountId(int subscriberAccountId, int authorAccountId);

        Task<IReadOnlyList<Subscription>> GetSubscriptionsWithSubscriberAccountsByAuthorAccountId(int authorAccountId);
        Task<IReadOnlyList<Subscription>> GetSubscriptionsWithAuthorAccountsBySubscriberAccountId(int subscriberAccountId);

        Task<int> CountSubscriptionsByAccountId(int accountId);
        Task<int> CountSubscribersByAccountId(int accountId);

        Task RemoveSubscriptionsByAccountId(int accountId);
    }
}

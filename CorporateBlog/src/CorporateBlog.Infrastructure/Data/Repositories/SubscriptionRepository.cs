using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateBlog.Infrastructure.Data.Repositories
{
    public class SubscriptionRepository : EfRepository<Subscription>, ISubscriptionRepository
    {
        public SubscriptionRepository(AppDbContext context) : base(context)
        {
        }
        public Task<Subscription> GetSubscriptionBySubscriberAccountIdAndAuthorAccountId(int subscriberAccountId, int authorAccountId)
            => Entities.Where(e => e.SubscriberAccountId == subscriberAccountId && e.AuthorAccountId == authorAccountId)
               .FirstAsync();

        public async Task<IReadOnlyList<Subscription>> GetSubscriptionsWithSubscriberAccountsByAuthorAccountId(int authorAccountId)
            => await Entities.Where(e => e.AuthorAccountId == authorAccountId)
            .Include(e => e.SubscriberAccount)
            .ToListAsync();


        public async Task<IReadOnlyList<Subscription>> GetSubscriptionsWithAuthorAccountsBySubscriberAccountId(int subscriberAccountId)
           => await Entities.Where(e => e.SubscriberAccountId == subscriberAccountId)
            .Include(e => e.AuthorAccount)
            .ToListAsync();

        public Task<int> CountSubscriptionsByAccountId(int accountId)
            => Entities.Where(e => e.SubscriberAccountId == accountId).Select(e => e.AuthorAccount).CountAsync();

        public Task<int> CountSubscribersByAccountId(int accountId)
            => Entities.Where(e => e.AuthorAccountId == accountId).Select(e => e.SubscriberAccount).CountAsync();

        public Task<Subscription?> FindSubscriptionBySubscriberAccountIdAndAuthorAccountId(int subscriberAccountId, int authorAccountId)
            => Entities.Where(e => e.SubscriberAccountId == subscriberAccountId && e.AuthorAccountId == authorAccountId)
                .FirstOrDefaultAsync();

        public Task RemoveSubscriptionsByAccountId(int accountId)
        {
            var subscriptions = Entities.Where(e => e.SubscriberAccountId == accountId || e.AuthorAccountId == accountId).ToList();
            Entities.RemoveRange(subscriptions);
            return Task.CompletedTask;
        }
    }
}

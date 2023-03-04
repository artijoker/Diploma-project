using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain.Exceptions;
using CorporateBlog.Models.Dto;
using Microsoft.AspNetCore.Identity;

namespace CorporateBlog.Domain.Services
{
    public class AccountService
    {
        private readonly IUnitOfWork _unit;
        private readonly IPasswordHasher<Account> _hasher;

        public AccountService(
            IUnitOfWork unit,
            IPasswordHasher<Account> hasher)
        {
            _unit = unit ?? throw new ArgumentNullException(nameof(unit));
            _hasher = hasher ?? throw new ArgumentNullException(nameof(hasher));
        }


        public async Task<AccountDto> GetAccountById(int accountId)
        {
            var account = await _unit.AccountRepository.GetById(accountId);
            return new()
            {
                Id = account.Id,
                Email = account.Email,
                LoginNickName = account.Login,
                Registered = account.Registered,
                RoleId = account.RoleId,
                RoleName = account.Role!.Name,
                QuantityPublishedPosts = await _unit.PostRepository.CountPostsByAccountIdAndStatus(account.Id, PostStatus.Published),
                QuantitySubscribers = await _unit.SubscriptionRepository.CountSubscribersByAccountId(accountId),
                QuantitySubscriptions = await _unit.SubscriptionRepository.CountSubscriptionsByAccountId(accountId)
            };
        }

        public async Task RemoveAccount(int id)
        {
            if (id == 1)
                throw new DefaultAdminException();

            var account = await _unit.AccountRepository.GetById(id);

            //var posts = await _unit.PostRepository.GetPostsByAccountId(account.Id);
            //var comments = await _unit.CommentRepository.GetCommentsByAccountId(account.Id);

            //foreach (var post in posts)
            //    post.IsDeleted = true;

            //foreach (var comment in comments)
            //    comment.IsDeleted = true;

            //await _unit.PostRepository.UpdateRange(posts.ToArray());
            //await _unit.CommentRepository.UpdateRange(comments.ToArray());

            //await _unit.LikeRepository.RemoveLikesByAccountId(account.Id);
            //await _unit.DislikeRepository.RemoveDislikesByAccountId(account.Id);
            await _unit.SubscriptionRepository.RemoveSubscriptionsByAccountId(account.Id);

            account.IsDeleted = true;

            await _unit.AccountRepository.Update(account);
            await _unit.SaveChangesAsync();
        }

        public async Task BanAccount(int id)
        {
            if (id == 1)
                throw new DefaultAdminException();

            var account = await _unit.AccountRepository.GetById(id);
            account.IsBanned = true;

            await _unit.AccountRepository.Update(account);
            await _unit.SaveChangesAsync();
        }

        public async Task UnlockAccount(int id)
        {
            var account = await _unit.AccountRepository.GetById(id);
            account.IsBanned = false;
            await _unit.AccountRepository.Update(account);
            await _unit.SaveChangesAsync();
        }

        public async Task UserUpdateAccount(int accountId, string email, string login, string? newPassword = null)
        {
            await UpdateAccount(accountId, email, login, newPassword);
        }


        public async Task AdminUpdateAccount(int accountId, string email, string login, int roleId, string? newPassword = null)
        {
            await UpdateAccount(accountId, email, login, newPassword, roleId);
        }

        private async Task UpdateAccount(int accountId, string email, string login, string? newPassword = null, int? roleId = null)
        {
            bool isModified = false;
            var account = await _unit.AccountRepository.GetById(accountId);

            if (accountId == 1)
                throw new DefaultAdminException();

            if (account.Email != email)
            {
                if (await _unit.AccountRepository.IsNoUniqueEmail(email))
                    throw new DuplicateEmailException();

                account.Email = email;
                isModified = true;
            }

            if (account.Login != login)
            {
                if (await _unit.AccountRepository.IsNoUniqueLogin(login))
                    throw new DuplicateLoginException();

                account.Login = login;
                isModified = true;
            }

            if (newPassword is not null)
            {
                account.PasswordHash = _hasher.HashPassword(account, newPassword);
                isModified = true;
            }

            if (roleId is not null && roleId != account.RoleId)
            {
                account.RoleId = roleId.Value;
                isModified = true;
            }

            if (isModified)
            {
                await _unit.AccountRepository.Update(account);
                await _unit.SaveChangesAsync();
            }
        }

        public async Task<IReadOnlyList<AccountDto>> GetAllAccounts()
        {
            var accounts = await _unit.AccountRepository.GetAll();
            var accountsDto = new List<AccountDto>();

            foreach (var account in accounts)
            {
                accountsDto.Add(new()
                {
                    Id = account.Id,
                    Email = account.Email,
                    LoginNickName = account.Login,
                    Registered = account.Registered,
                    RoleId = account.RoleId,
                    RoleName = account.Role!.Name,
                    IsBanned = account.IsBanned,
                    IsDeleted = account.IsDeleted,
                    QuantityPublishedPosts = await _unit.PostRepository.CountPostsByAccountIdAndStatus(account.Id, PostStatus.Published)

                });
            }
            return accountsDto;
        }


        public async Task<IReadOnlyList<AccountDto>> GetAccountsThatHavePublishedPosts()
        {
            var accounts = await _unit.AccountRepository.GetAccountsThatHavePostsWithStatus(PostStatus.Published);
            var accountsDto = new List<AccountDto>();
            foreach (var account in accounts)
            {
                accountsDto.Add(new()
                {
                    Id = account.Id,
                    LoginNickName = account.Login,
                    QuantityPublishedPosts = await _unit.PostRepository.CountPostsByAccountIdAndStatus(account.Id, PostStatus.Published),
                    QuantitySubscribers = await _unit.SubscriptionRepository.CountSubscribersByAccountId(account.Id)

                });
            }
            return accountsDto;
        }

        public async Task SubscribeToAuthor(int subscriberAccountId, int authorAccountId)
        {
            var subscription = await _unit.SubscriptionRepository.FindSubscriptionBySubscriberAccountIdAndAuthorAccountId(
                subscriberAccountId, authorAccountId
                );

            if (subscription is not null)
                return;


            var subscriber = await _unit.AccountRepository.GetById(subscriberAccountId);
            var author = await _unit.AccountRepository.GetById(authorAccountId);

            subscription = new Subscription()
            {
                SubscriberAccountId = subscriber.Id,
                AuthorAccountId = author.Id,
                SubscriberAccount = subscriber,
                AuthorAccount = author
            };

            await _unit.SubscriptionRepository.Add(subscription);

            await _unit.SaveChangesAsync();
        }

        public async Task UnsubscribeFromAuthor(int subscriberAccountId, int authorAccountId)
        {
            var subscription = await _unit.SubscriptionRepository.FindSubscriptionBySubscriberAccountIdAndAuthorAccountId(
                subscriberAccountId, authorAccountId
                );
            if (subscription is not null)
            {
                await _unit.SubscriptionRepository.Remove(subscription);
                await _unit.SaveChangesAsync();
            }

        }
        public async Task<IReadOnlyList<AccountDto>> GetSubscriptionsByAccountId(int accountId)
        {
            var subscriptions = await _unit.SubscriptionRepository.GetSubscriptionsWithAuthorAccountsBySubscriberAccountId(accountId);
            var accountsDto = new List<AccountDto>();
            foreach (var subscription in subscriptions)
            {
                var author = subscription.AuthorAccount;
                if (author is not null)
                {
                    accountsDto.Add(new()
                    {
                        Id = author.Id,
                        LoginNickName = author.Login,
                        QuantityPublishedPosts = await _unit.PostRepository.CountPostsByAccountIdAndStatus(author.Id, PostStatus.Published),
                        QuantitySubscribers = await _unit.SubscriptionRepository.CountSubscribersByAccountId(author.Id)
                    });
                }
            }
            return accountsDto;
        }

        public async Task<bool> IsSubscribeDtoAuthor(int subscriberAccountId, int authorAccountId)
        {
            var subscription = await _unit.SubscriptionRepository.FindSubscriptionBySubscriberAccountIdAndAuthorAccountId(
                subscriberAccountId, authorAccountId
                );

            return subscription is not null;
        }
    }
}

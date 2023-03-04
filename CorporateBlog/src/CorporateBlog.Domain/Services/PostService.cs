using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.Domain.Services
{
    public class PostService
    {
        private readonly IUnitOfWork _unit;


        public PostService(IUnitOfWork unit)
        {
            _unit = unit ?? throw new ArgumentNullException(nameof(unit));
        }

        public async Task<PostDto> GetPostById(int postId)
        {

            var post = await _unit.PostRepository.GetById(postId);
            return new()
            {
                Id = post.Id,
                Title = post.Title,
                Anons = post.Anons,
                FullText = post.FullText,
                LastChange = post.LastChange,
                Status = post.Status,
                AuthorId = post.AccountId,
                AuthorNickname = post.Account!.Login,
                CategoryId = post.CategoryId,
                CategoryName = post.Сategory!.Name,
                Likes = await _unit.LikeRepository.CountLikesByPostId(post.Id),
                Dislikes = await _unit.DislikeRepository.CountDislikesByPostId(post.Id),
                CommentsNumber = await _unit.CommentRepository.CountCommentsByPostId(post.Id),
                IsDeleted = post.IsDeleted
            };
        }



        public async Task<IReadOnlyList<PostDto>> GetPendingPosts()
            => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByStatus(PostStatus.Pending));

        public async Task<IReadOnlyList<PostDto>> GetPublishedPosts()
           => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByStatus(PostStatus.Published));



        public async Task<IReadOnlyList<PostDto>> GetPublishedPostsByCategoryId(int categoryId)
            => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByCategoryIdAndStatus(categoryId, PostStatus.Published));

        public async Task<IReadOnlyList<PostDto>> GetPublishedPostsByAccountId(int accountId)
            => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByAccountIdAndStatus(accountId, PostStatus.Published));

        public async Task<IReadOnlyList<PostDto>> GetDraftPostsByAccountId(int accountId)
            => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByAccountIdAndStatus(accountId, PostStatus.Draft));

        public async Task<IReadOnlyList<PostDto>> GetPendingPostsByAccountId(int accountId)
            => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByAccountIdAndStatus(accountId, PostStatus.Pending));

        public async Task<IReadOnlyList<PostDto>> GetRejectedPostsByAccountId(int accountId)
             => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByAccountIdAndStatus(accountId, PostStatus.Rejected));




        public async Task<IReadOnlyList<PostDto>> GetPostsFromTrashByAccountId(int accountId)
            => await PostsToPreviewPosts(await _unit.PostRepository.GetPostsByAccountIdAndStatus(accountId, PostStatus.InTrash));


        public async Task<IReadOnlyList<PostDto>> GetLikedPostsByAccountId(int accountId)
        {
            var posts = await _unit.PostRepository.GetLikedPostsByAccountId(accountId);
            return await PostsToPreviewPosts(posts.Where(p => p.Status == PostStatus.Published).ToList());
        }


        public async Task AddPostWithStatusDraft(
            int accountId,
            string title,
            string anons,
            string fullText,

            int categoryId)
        {
            await AddPost(accountId, title, anons, fullText, categoryId, PostStatus.Draft);
        }

        public async Task AddPostWithStatusPending(
            int accountId,
            string title,
            string anons,
            string fullText,
            int categoryId)
        {

            await AddPost(accountId, title, anons, fullText, categoryId, PostStatus.Pending);
        }

        public async Task AddPostWithStatusPublished(
            int accountId,
            string title,
            string anons,
            string fullText,
            int categoryId)
        {
            await AddPost(accountId, title, anons, fullText, categoryId, PostStatus.Published);
        }

        private async Task AddPost(int accountId,
           string title,
           string anons,
           string fullText,
           int categoryId,
           string status)
        {
            var category = await _unit.CategoryRepository.GetById(categoryId);
            var post = new Post()
            {
                Title = title,
                Anons = anons,
                FullText = fullText,
                LastChange = DateTime.Now,
                CategoryId = category.Id,
                AccountId = accountId,
                Status = status
            };

            await _unit.PostRepository.Add(post);
            await _unit.SaveChangesAsync();
        }




        public async Task UserUpdatePost(
            int postId,
            string title,
            string anons,
            string fullText,
            int categoryId)
        {
            var post = await _unit.PostRepository.GetById(postId);
            if (IsUpdatePost(post, title, anons, fullText, categoryId))
            {
                post.Title = title;
                post.Anons = anons;
                post.FullText = fullText;
                post.CategoryId = categoryId;

                if (post.Status == PostStatus.Published)
                    post.Status = PostStatus.Pending;

                post.LastChange = DateTime.Now;

                await _unit.PostRepository.Update(post);
                await _unit.SaveChangesAsync();
            }
        }

        public async Task AdminUpdatePost(
            int postId,
            string title,
            string anons,
            string fullText,
            int categoryId)
        {
            var post = await _unit.PostRepository.GetById(postId);
            if (IsUpdatePost(post, title, anons, fullText, categoryId))
            {
                post.Title = title;
                post.Anons = anons;
                post.FullText = fullText;
                post.CategoryId = categoryId;

                post.LastChange = DateTime.Now;
                await _unit.PostRepository.Update(post);
                await _unit.SaveChangesAsync();
            }
        }


        private static bool IsUpdatePost(Post post,
            string title,
            string anons,
            string fullText,
            int categoryId)
        {
            return post.Title != title || post.Anons != anons || post.FullText != fullText || post.CategoryId != categoryId;
        }


        public async Task PostSenDtoTrashById(int postId)
        {
            var post = await _unit.PostRepository.GetById(postId);

            var comments = await _unit.CommentRepository.GetCommentsByPostId(post.Id);
            foreach (var comment in comments)
                comment.IsDeleted = true;

            await _unit.CommentRepository.UpdateRange(comments.ToArray());
            await _unit.LikeRepository.RemoveLikesByPostId(postId);
            await _unit.DislikeRepository.RemoveDislikesByPostId(postId);

            post.Status = PostStatus.InTrash;

            await _unit.PostRepository.Update(post);
            await _unit.SaveChangesAsync();
        }

        public async Task RestorePostById(int postId)
           => await SetPostStatusDraftById(postId);


        public async Task RemovePost(int postId)
        {
            var post = await _unit.PostRepository.GetById(postId);
            post.IsDeleted = true;
            await _unit.PostRepository.Update(post);
            await _unit.SaveChangesAsync();
        }

        public async Task SetPostStatusPendingById(int postId)
            => await UpdatePostStatus(postId, PostStatus.Pending);

        public async Task SetPostStatusPublishedById(int postId)
            => await UpdatePostStatus(postId, PostStatus.Published);

        public async Task SetPostStatusDraftById(int postId)
        => await UpdatePostStatus(postId, PostStatus.Draft);

        public async Task SetPostStatusRejectedById(int postId)
         => await UpdatePostStatus(postId, PostStatus.Rejected);

        private async Task UpdatePostStatus(int postId, string status)
        {
            var post = await _unit.PostRepository.GetById(postId);
            if (post.Status != status)
            {
                if (status == PostStatus.Draft)
                {
                    var comments = await _unit.CommentRepository.GetCommentsByPostId(post.Id);
                    foreach (var comment in comments)
                        comment.IsDeleted = true;

                    await _unit.CommentRepository.UpdateRange(comments.ToArray());
                    await _unit.LikeRepository.RemoveLikesByPostId(postId);
                    await _unit.DislikeRepository.RemoveDislikesByPostId(postId);
                }
                post.LastChange = DateTime.Now;
                post.Status = status;
                await _unit.PostRepository.Update(post);
                await _unit.SaveChangesAsync();
            }
        }

        public Task<bool> IsHaveLikeByAccountIdAndPostId(int accountId, int postId)
            => _unit.LikeRepository.IsHaveLikeByAccountIdAndPostId(accountId, postId);

        public Task<bool> IsHaveDislikeByAccountIdAndPostId(int accountId, int postId)
            => _unit.DislikeRepository.IsHaveDislikeByAccountIdAndPostId(accountId, postId);

        public async Task AddLikeToPost(int accountId, int postId)
        {
            if (await _unit.LikeRepository.IsHaveLikeByAccountIdAndPostId(accountId, postId))
                return;

            var post = await _unit.PostRepository.GetById(postId);
            var account = await _unit.AccountRepository.GetById(accountId);

            await _unit.LikeRepository.Add(new Like()
            {
                AccountId = account.Id,
                Account = account,
                PostId = post.Id,
                Post = post,
                Created = DateTime.Now,
            });

            if (await _unit.DislikeRepository.IsHaveDislikeByAccountIdAndPostId(accountId, postId))
                await _unit.DislikeRepository.Remove(
                    await _unit.DislikeRepository.GetDislikeByAccountIdAndPostId(accountId, postId)
                    );

            await _unit.SaveChangesAsync();
        }

        public async Task RemoveLikeFromPost(int accountId, int postId)
        {
            if (await _unit.LikeRepository.IsHaveLikeByAccountIdAndPostId(accountId, postId))
            {
                await _unit.LikeRepository.Remove(
                    await _unit.LikeRepository.GetLikeByAccountIdAndPostId(accountId, postId)
                    );
                await _unit.SaveChangesAsync();
            }
        }

        public async Task AddDislikeToPost(int accountId, int postId)
        {
            if (await _unit.DislikeRepository.IsHaveDislikeByAccountIdAndPostId(accountId, postId))
                return;

            var post = await _unit.PostRepository.GetById(postId);
            var account = await _unit.AccountRepository.GetById(accountId);

            await _unit.DislikeRepository.Add(new Dislike()
            {
                AccountId = account.Id,
                Account = account,
                PostId = post.Id,
                Post = post,
                Created = DateTime.Now,
            });

            if (await _unit.LikeRepository.IsHaveLikeByAccountIdAndPostId(accountId, postId))
                await _unit.LikeRepository.Remove(
                    await _unit.LikeRepository.GetLikeByAccountIdAndPostId(accountId, postId)
                    );


            await _unit.SaveChangesAsync();

        }

        public async Task RemoveDislikeFromPost(int accountId, int postId)
        {
            if (await _unit.DislikeRepository.IsHaveDislikeByAccountIdAndPostId(accountId, postId))
            {
                await _unit.DislikeRepository.Remove(
                    await _unit.DislikeRepository.GetDislikeByAccountIdAndPostId(accountId, postId)
                    );
                await _unit.SaveChangesAsync();
            }
        }

        public async Task<IReadOnlyList<PostDto>> FindPublishedPostsBySubstring(string substring)
        {
            var posts = await _unit.PostRepository.FindPostsBySubstringAndStatus(substring, PostStatus.Published);
            return await PostsToPreviewPosts(posts.Where(p => !p.IsDeleted).ToList());
        }




        private async Task<PostDto> PostToPreviewPostDtobyPostId(Post post)
        {
            return new()
            {
                Id = post.Id,
                Title = post.Title,
                Anons = post.Anons,
                LastChange = post.LastChange,
                AuthorId = post.AccountId,
                AuthorNickname = post.Account!.Login,
                CategoryId = post.CategoryId,
                CategoryName = post.Сategory!.Name,
                Likes = await _unit.LikeRepository.CountLikesByPostId(post.Id),
                Dislikes = await _unit.DislikeRepository.CountDislikesByPostId(post.Id),
                CommentsNumber = await _unit.CommentRepository.CountCommentsByPostId(post.Id)
            };
        }

        private async Task<IReadOnlyList<PostDto>> PostsToPreviewPosts(IReadOnlyList<Post> posts)
        {
            var postsDto = new List<PostDto>();
            foreach (var post in posts)
                postsDto.Add(await PostToPreviewPostDtobyPostId(post));
            return postsDto;
        }


    }
}

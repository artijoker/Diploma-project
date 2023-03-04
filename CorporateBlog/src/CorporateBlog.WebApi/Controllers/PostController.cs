using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CorporateBlog.WebApi.Filters;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Requests;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers
{
    [Route("posts")]
    [ModelValidationFilter]
    public class AdminPostController : ControllerBase
    {
        private readonly PostService _service;

        public AdminPostController(PostService service)
        {
            _service = service;
        }


        [HttpGet("get-posts")]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetPosts()
        {
            var result = await _service.GetPublishedPosts();

            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = result
            };
        }

        [HttpPost("post/get-by-id")]
        public async Task<ActionResult<Response<PostDto>>> GetPost([FromBody] int postId)
        {
            var result = await _service.GetPostById(postId);

            return new Response<PostDto>()
            {
                Succeeded = true,
                Result = result
            };
        }

        [HttpPost("get-posts-by-author-id")]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetPostsByAuthorId([FromBody] int accountId)
        {
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetPublishedPostsByAccountId(accountId)
            };
        }

        [HttpPost("find-posts-by-substring")]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> FindPostsBySubstring([FromBody] SearchRequestModel model)
        {
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.FindPublishedPostsBySubstring(model.Substring)
            };
        }


        [HttpGet("get-posts-with-status-published")]
        [Authorize]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetPublishedPostsByAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetPublishedPostsByAccountId(id)
            };
        }


        [HttpGet("get-posts-with-status-draft")]
        [Authorize]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetDraftPostsByAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetDraftPostsByAccountId(id)
            };
        }

        [HttpGet("get-posts-with-status-pending")]
        [Authorize]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetPendingPostsByAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetPendingPostsByAccountId(id)
            };
        }


        [HttpGet("get-posts-with-status-rejected")]
        [Authorize]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetRejectedPostsByAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetRejectedPostsByAccountId(id)
            };
        }

        [HttpGet("get-posts-from-trash")]
        [Authorize]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetPostsFromTrashByAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetPostsFromTrashByAccountId(id)
            };
        }


        [HttpPost("get-posts-by-category-id")]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetPostsByCategoryId([FromBody] int categoryId)
        {
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetPublishedPostsByCategoryId(categoryId)
            };
        }

        [HttpGet("get-liked-posts-by-account")]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetLikedPostsByAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetLikedPostsByAccountId(id)
            };
        }

        [HttpPost("post/add")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> AddPost([FromBody] PostRequestsModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AddPostWithStatusDraft(id, model.Title, model.Anons, model.FullText, model.CategoryId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }


        [HttpPost("post/update")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> UpdatePost([FromBody] UpdatePostRequestsModel model)
        {
            await _service.UserUpdatePost(model.PostId, model.Title, model.Anons, model.FullText, model.CategoryId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/send-to-trash")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> PostSenDtoTrashById([FromBody] int postId)
        {

            await _service.PostSenDtoTrashById(postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/restore")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> RestorePostById([FromBody] int postId)
        {
            await _service.RestorePostById(postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/delete")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> RemovePostByPostId([FromBody] int postId)
        {

            await _service.RemovePost(postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }



        [HttpPost("post/add-with-status-pending")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> AddPostWithStatusPending([FromBody] PostRequestsModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AddPostWithStatusPending(id, model.Title, model.Anons, model.FullText, model.CategoryId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/set-status-pending")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> SetPostStatusPending([FromBody] int postId)
        {
            await _service.SetPostStatusPendingById(postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/set-status-draft")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> SetPostStatusDraft([FromBody] int postId)
        {

            await _service.SetPostStatusDraftById(postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/check-like-by-post-id")]
        [Authorize]
        public async Task<ActionResult<Response<bool>>> CheckLikeByPostId([FromBody] int postId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<bool>()
            {
                Succeeded = true,
                Result = await _service.IsHaveLikeByAccountIdAndPostId(id, postId)
            };
        }

        [HttpPost("post/check-dislike-by-post-id")]
        [Authorize]
        public async Task<ActionResult<Response<bool>>> CheckDislikeByPostId([FromBody] int postId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<bool>()
            {
                Succeeded = true,
                Result = await _service.IsHaveDislikeByAccountIdAndPostId(id, postId)
            };
        }

        [HttpPost("post/add-like")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> AddLikeToPost([FromBody] int postId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AddLikeToPost(id, postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }
        [HttpPost("post/remove-like")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> RemoveLikeFromPost([FromBody] int postId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.RemoveLikeFromPost(id, postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }


        [HttpPost("post/add-dislike")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> AddDislikeToPost([FromBody] int postId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AddDislikeToPost(id, postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/remove-dislike")]
        [Authorize]
        public async Task<ActionResult<Response<object>>> RemoveDislikeToPost([FromBody] int postId)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.RemoveDislikeFromPost(id, postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }
    }
}

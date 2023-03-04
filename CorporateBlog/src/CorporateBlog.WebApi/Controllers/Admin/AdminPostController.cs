using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CorporateBlog.WebApi.Filters;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Requests;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers.Admin
{
    [Authorize(Roles = "admin")]
    [Route("admin/posts")]
    [ModelValidationFilter]
    public class AdminPostController : ControllerBase
    {
        private readonly PostService _service;

        public AdminPostController(PostService service)
        {
            _service = service;
        }

        [HttpPost("post/add-with-status-published")]
        public async Task<ActionResult<Response<object>>> AddNewPostWithStatusPublished([FromBody] PostRequestsModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AddPostWithStatusPublished(id, model.Title, model.Anons, model.FullText, model.CategoryId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }



        [HttpGet("get-posts-with-status-pending")]
        public async Task<ActionResult<Response<IReadOnlyList<PostDto>>>> GetPendingPosts()
        {
            return new Response<IReadOnlyList<PostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetPendingPosts()
            };
        }

        [HttpPost("post/set-status-published")]
        public async Task<ActionResult<Response<object>>> SetPostStatusPublished([FromBody] int postId)
        {

            await _service.SetPostStatusPublishedById(postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/set-status-rejected")]
        public async Task<ActionResult<Response<object>>> SetPostStatusRejected([FromBody] int postId)
        {

            await _service.SetPostStatusRejectedById(postId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("post/update")]
        public async Task<ActionResult<Response<object>>> UpdatePost([FromBody] UpdatePostRequestsModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AdminUpdatePost(model.PostId, model.Title, model.Anons, model.FullText, model.CategoryId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }
    }
}

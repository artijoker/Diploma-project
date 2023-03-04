using CorporateBlog.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers.Admin
{
    [Authorize(Roles = "admin")]
    [Route("admin/complaints")]
    [ModelValidationFilter]
    public class AdminComplaintController : ControllerBase
    {
        private readonly ComplaintService _service;

        public AdminComplaintController(ComplaintService service)
        {
            _service = service;
        }

        [HttpGet("get-all-complaints-on-post")]
        public async Task<ActionResult<Response<IReadOnlyList<ComplaintPostDto>>>> GetAllComplaintsOnPosts()
        {
            return new Response<IReadOnlyList<ComplaintPostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetAllComplaintsOnPosts()
            };
        }

        [HttpGet("get-all-complaints-on-comments")]
        public async Task<ActionResult<Response<IReadOnlyList<ComplaintCommentDto>>>> GetAllComplaintsOnComments()
        {
            return new Response<IReadOnlyList<ComplaintCommentDto>>()
            {
                Succeeded = true,
                Result = await _service.GetAllComplaintsOnComments()
            };
        }

        [HttpGet("count-complaints-on-comments")]
        public async Task<ActionResult<Response<int>>> CountComplaintsOnComments()
        {
            return new Response<int>()
            {
                Succeeded = true,
                Result = await _service.CountComplaintsOnComments()
            };
        }


        [HttpGet("count-complaints-on-posts")]
        public async Task<ActionResult<Response<int>>> CountComplaintsOnPosts()
        {
            return new Response<int>()
            {
                Succeeded = true,
                Result = await _service.CountComplaintsOnPosts()
            };
        }


        [HttpPost("get-complaints-on-post-by-account-id")]
        public async Task<ActionResult<Response<IReadOnlyList<ComplaintPostDto>>>> GetComplaintsOnPostsByAccountId([FromBody] int accountId)
        {
            return new Response<IReadOnlyList<ComplaintPostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetComplaintsOnPostsByAccountId(accountId)
            };
        }

        [HttpPost("get-complaints-on-post-by-post-id")]
        public async Task<ActionResult<Response<IReadOnlyList<ComplaintPostDto>>>> GetComplaintsOnPostsByPostId([FromBody] int postId)
        {
            return new Response<IReadOnlyList<ComplaintPostDto>>()
            {
                Succeeded = true,
                Result = await _service.GetComplaintsOnPostsByPostId(postId)
            };

        }

        [HttpPost("get-complaints-on-comment-by-account-id")]
        public async Task<ActionResult<Response<IReadOnlyList<ComplaintCommentDto>>>> GetComplaintsOnCommentsByAccountId([FromBody] int accountId)
        {
            return new Response<IReadOnlyList<ComplaintCommentDto>>()
            {
                Succeeded = true,
                Result = await _service.GetComplaintsOnCommentsByAccountId(accountId)
            };
        }

        [HttpPost("get-complaints-on-comment-by-comment-id")]
        public async Task<ActionResult<Response<IReadOnlyList<ComplaintCommentDto>>>> GetComplaintsOnCommentsByCommentId([FromBody] int postId)
        {
            return new Response<IReadOnlyList<ComplaintCommentDto>>()
            {
                Succeeded = true,
                Result = await _service.GetComplaintsOnCommentsByCommentId(postId)
            };

        }

        [HttpPost("complaint-on-post/delete-by-id")]
        public async Task<ActionResult<Response<object>>> RemoveComplaintOnPost([FromBody] int complainId)
        {
            await _service.RemoveComplaintOnPost(complainId);
            return new Response<object>()
            {
                Succeeded = true
            };

        }

        [HttpPost("complaint-on-comment/delete-by-id")]
        public async Task<ActionResult<Response<object>>> RemoveComplaintOnComment([FromBody] int complainId)
        {
            await _service.RemoveComplaintOnComment(complainId);
            return new Response<object>()
            {
                Succeeded = true
            };

        }
    }
}

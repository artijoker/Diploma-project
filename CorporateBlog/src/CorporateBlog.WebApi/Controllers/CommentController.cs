using CorporateBlog.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Requests;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers
{

    [Route("comments")]
    [ModelValidationFilter]
    public class CommentController : ControllerBase
    {
        private readonly CommentService _commentService;

        public CommentController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("get-comments-by-post-id")]
        public async Task<ActionResult<Response<IReadOnlyList<CommentDto>>>> GetCommentsByPostId([FromBody] int postId)
        {
            return new Response<IReadOnlyList<CommentDto>>()
            {
                Succeeded = true,
                Result = await _commentService.GetCommentsByPostId(postId)
            };
        }

        [Authorize]
        [HttpGet("get-comments-by-account")]
        public async Task<ActionResult<Response<IReadOnlyList<CommentDto>>>> GetCommentsByAccount()
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return new Response<IReadOnlyList<CommentDto>>()
            {
                Succeeded = true,
                Result = await _commentService.GetCommentsOnPublishedPostsByAccountId(id)
            };
        }

        [Authorize]
        [HttpPost("comment/get-by-id")]
        public async Task<ActionResult<Response<CommentDto>>> GetCommentById([FromBody] int commentId)
        {
            return new Response<CommentDto>()
            {
                Succeeded = true,
                Result = await _commentService.GetCommentById(commentId)

            };
        }

        [Authorize]
        [HttpPost("comment/add")]
        public async Task<ActionResult<Response<IReadOnlyList<CommentDto>>>> AddComment([FromBody] CommentRequestsModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var comments = await _commentService.AddComment(id, model.PostId, model.Text);
            return new Response<IReadOnlyList<CommentDto>>()
            {
                Succeeded = true,
                Result = comments

            };
        }

        [Authorize]
        [HttpPost("comment/update")]
        public async Task<ActionResult<Response<object>>> UpdateComment([FromBody] UpdateCommentRequestsModel model)
        {
            await _commentService.UpdateComment(model.CommentId, model.NewText);
            return new Response<object>()
            {
                Succeeded = true
            };

        }

        [Authorize]
        [HttpPost("comment/delete")]
        public async Task<ActionResult<Response<object>>> RemoveCommentByPostId([FromBody] int commentId)
        {
            await _commentService.RemoveComment(commentId);
            return new Response<object>()
            {
                Succeeded = true
            };

        }
    }

}

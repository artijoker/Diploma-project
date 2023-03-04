using CorporateBlog.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers.Admin
{

    [Route("admin/comments")]
    [ModelValidationFilter]
    public class AdminCommentController : ControllerBase
    {
        private readonly CommentService _commentService;

        public AdminCommentController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("get-all-comments")]
        public async Task<ActionResult<Response<IReadOnlyList<CommentDto>>>> GetAllComments()
        {
            return new Response<IReadOnlyList<CommentDto>>()
            {
                Succeeded = true,
                Result = await _commentService.GetAllComments()
            };
        }

    }

}

using CorporateBlog.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Requests;
using CorporateBlog.Models.Http.Responses;

namespace CorporateBlog.WebApi.Controllers
{
    [Authorize]
    [Route("complaints")]
    [ModelValidationFilter]
    public class ComplaintController : ControllerBase
    {
        private readonly ComplaintService _service;

        public ComplaintController(ComplaintService service)
        {
            _service = service;
        }

        [HttpPost("add-complaint-on-post")]
        public async Task<ActionResult<Response<object>>> AddComplaintOnPost([FromBody] ComplaintOnPostRequestModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AddComplaintOnPost(id, model.PostId, model.Text);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("add-complaint-on-comment")]
        public async Task<ActionResult<Response<object>>> AddComplaintOnComment([FromBody] ComplaintOnCommentRequestModel model)
        {
            var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _service.AddComplaintOnComment(id, model.CommentId, model.Text);
            return new Response<object>()
            {
                Succeeded = true
            };
        }


    }
}

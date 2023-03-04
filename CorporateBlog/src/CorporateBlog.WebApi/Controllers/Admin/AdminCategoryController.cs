using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CorporateBlog.WebApi.Filters;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Requests;
using CorporateBlog.Models.Http.Responses;

namespace CorporateBlog.WebApi.Controllers.Admin
{
    [Route("admin/categories")]
    [Authorize(Roles = "admin")]
    [ModelValidationFilter]
    public class AdminCategoryController : ControllerBase
    {
        private readonly CategoryService _service;

        public AdminCategoryController(CategoryService service)
        {
            _service = service;
        }

        [HttpPost("category/add")]
        public async Task<ActionResult<Response<object>>> AddCategory([FromBody] CategoryRequestModel model)
        {
            await _service.AddCategory(model.CategoryName);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("category/edit")]
        public async Task<ActionResult<Response<object>>> UpdateCategory([FromBody] UpdateCategoryRequestModel model)
        {
            await _service.UpdateCategory(model.CategoryId, model.CategoryName);
            return new Response<object>()
            {
                Succeeded = true
            };
        }

        [HttpPost("category/delete-by-id")]
        public async Task<ActionResult<Response<object>>> RemoveCategory([FromBody] int categoryId)
        {
            await _service.RemoveCategory(categoryId);
            return new Response<object>()
            {
                Succeeded = true
            };
        }
    }
}



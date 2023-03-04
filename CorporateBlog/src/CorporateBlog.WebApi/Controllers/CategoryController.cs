using Microsoft.AspNetCore.Mvc;
using CorporateBlog.WebApi.Filters;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers
{
    [Route("categories")]
    [ModelValidationFilter]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _service;

        public CategoryController(CategoryService service)
        {
            _service = service;
        }


        [HttpGet("get-categories")]
        public async Task<ActionResult<Response<IReadOnlyList<CategoryDto>>>> GetCategories()
        {
            return new Response<IReadOnlyList<CategoryDto>>()
            {
                Succeeded = true,
                Result = await _service.GetCategories()
            };
        }
    }
}



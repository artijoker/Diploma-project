using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CorporateBlog.WebApi.Filters;
using CorporateBlog.Domain.Services;
using CorporateBlog.Models.Http.Responses;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.WebApi.Controllers.Admin
{
    [Route("admin/roles")]
    [ModelValidationFilter]
    [Authorize(Roles = "admin")]
    public class AdminRoleController : ControllerBase
    {
        private readonly RoleService _service;

        public AdminRoleController(RoleService service)
        {
            _service = service;
        }

        [HttpGet("get-roles")]
        public async Task<ActionResult<Response<IReadOnlyList<RoleDto>>>> GetRoles()
        {
            return new Response<IReadOnlyList<RoleDto>>()
            {
                Succeeded = true,
                Result = await _service.GetAll()
            };
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CorporateBlog.Domain;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.Domain.Services
{
    public class RoleService
    {
        private readonly IUnitOfWork _unit;

        public RoleService(IUnitOfWork unit)
        {
            _unit = unit ?? throw new ArgumentNullException(nameof(unit));
        }

        public async Task<IReadOnlyList<RoleDto>> GetAll()
        {
            var roles = await _unit.RoleRepository.GetAll();
            return roles.Select(r => new RoleDto()
            {
                Id = r.Id,
                Name = r.Name
            }).ToList();
        }

    }
}

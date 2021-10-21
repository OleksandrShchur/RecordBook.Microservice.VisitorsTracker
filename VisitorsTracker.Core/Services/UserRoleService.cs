using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Db.EFCore;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Core.Services
{
    public class UserRoleService : BaseService<UserRole>, IUserRoleService
    {
        private readonly IMapper _mapper;
        private const string defaultRole = "Guest";

        public UserRoleService(
            AppDbContext context,
            IMapper mapper)
            : base(context)
        {
            _mapper = mapper;
        }

        public async Task GrandDefaultRole(Guid userId)
        {
            var role = _context.Roles.FirstOrDefault(r => r.Name == defaultRole);
            var userRole = new UserRole() { UserId = userId, RoleId = role.Id };

            var result = await InsertAsync(userRole);

            if(result.UserId == Guid.Empty || result.RoleId == Guid.Empty)
            {
                throw new Exception("Adding user default role failed");
            }
        }

        public List<RoleItemViewModel> GetAll()
        {
            var roles = _context.Roles
                .Select(r => _mapper.Map<Role, RoleItemViewModel>(r))
                .ToList();

            return roles;
        }
    }
}

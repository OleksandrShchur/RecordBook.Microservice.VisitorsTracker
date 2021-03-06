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
        private const string curatorRole = "Curator";

        public UserRoleService(
            AppDbContext context,
            IMapper mapper)
            : base(context)
        {
            _mapper = mapper;
        }

        public async Task GrantToRole(Guid userId, string roleName)
        {
            var role = _context.Roles.FirstOrDefault(r => r.Name == roleName);
            var userRole = new UserRole() { UserId = userId, RoleId = role.Id };

            var result = await Insert(userRole);

            if(result.UserId == Guid.Empty || result.RoleId == Guid.Empty)
            {
                throw new Exception("Adding user role failed");
            }
        }

        public List<RoleItemViewModel> GetAll()
        {
            var roles = _context.Roles
                .Where(r => r.Name != curatorRole)
                .Select(r => _mapper.Map<Role, RoleItemViewModel>(r))
                .ToList();

            return roles;
        }

        public async Task UpdateUserRoles(UpdateRoleListViewModel user)
        {
            var currentRoles = GetCurrentUserRoles(user.Id);
            var rolesToAdd = user.Roles.Where(item => !currentRoles.Any(r => item == r));
            var rolesToRemove = currentRoles.Where(item => !user.Roles.Any(r => item == r));

            foreach(var role in rolesToRemove)
            {
                var deleteRole = _context.UserRoles
                    .FirstOrDefault(u => u.RoleId == role.Id && u.UserId == user.Id);

                await Delete(deleteRole);
            }

            foreach (var role in rolesToAdd)
            {

                var result = await Insert(new UserRole { UserId = user.Id, RoleId = role.Id });

                if (result.UserId == Guid.Empty || result.RoleId == Guid.Empty)
                {
                    throw new Exception("Adding user role failed");
                }
            }
        }

        private List<RoleItemViewModel> GetCurrentUserRoles(Guid id)
        {
            var roles = _context.UserRoles
                .Where(r => r.User.Id == id)
                .Select(r => _mapper.Map<Role, RoleItemViewModel>(r.Role))
                .ToList();

            return roles;
        }
    }
}

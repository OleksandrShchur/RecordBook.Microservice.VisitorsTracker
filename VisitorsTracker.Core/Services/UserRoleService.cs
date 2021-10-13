using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Db.EFCore;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Core.Services
{
    public class UserRoleService : BaseService<UserRole>, IUserRoleService
    {
        private const string defaultRole = "Guest";

        public UserRoleService(
            AppDbContext context)
            : base(context)
        {
        }

        public async Task GrandDefaultRole(Guid userId)
        {
            var role = _context.Roles.FirstOrDefault(r => r.Name == defaultRole);

            var userRole = new UserRole();
            userRole.UserId = userId;
            userRole.RoleId = role.Id;

            var result = await InsertAsync(userRole);

            if(result.UserId == Guid.Empty || result.RoleId == Guid.Empty)
            {
                throw new Exception("Adding failed");
            }
        }
    }
}

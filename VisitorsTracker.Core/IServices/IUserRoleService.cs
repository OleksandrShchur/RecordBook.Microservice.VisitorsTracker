using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Core.IServices
{
    public interface IUserRoleService
    {
        Task GrantToRole(Guid userId, string roleName);

        List<RoleItemViewModel> GetAll();

        Task UpdateUserRoles(UpdateRoleListViewModel user);
    }
}

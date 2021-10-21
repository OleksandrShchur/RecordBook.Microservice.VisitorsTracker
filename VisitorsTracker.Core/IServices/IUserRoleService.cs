using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Core.IServices
{
    public interface IUserRoleService
    {
        Task GrandDefaultRole(Guid userId);

        List<RoleItemViewModel> GetAll();
    }
}

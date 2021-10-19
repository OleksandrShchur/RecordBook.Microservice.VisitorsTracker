using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisitorsTracker.Core.IServices
{
    public interface IUserRoleService
    {
        Task GrandDefaultRole(Guid userId);

        Task PromoteToRole(Guid userId, Guid roleId);
    }
}

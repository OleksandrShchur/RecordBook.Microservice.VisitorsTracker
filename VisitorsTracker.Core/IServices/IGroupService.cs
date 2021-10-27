using System.Collections.Generic;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Core.IServices
{
    public interface IGroupService
    {
        List<UserGroup> GetAllGroups();
    }
}

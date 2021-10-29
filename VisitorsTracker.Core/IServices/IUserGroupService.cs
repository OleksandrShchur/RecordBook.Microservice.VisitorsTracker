using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Core.IServices
{
    public interface IUserGroupService
    {
        List<UserGroup> GetAllGroups();

        Task<UserGroup> AddUserToGroup(Guid userId, string numberOfGroup);

        Task AssignCurator(Guid id);
    }
}

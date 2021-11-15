using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Db.EFCore;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Core.Services
{
    public class UserGroupService : BaseService<UserGroup>, IUserGroupService
    {
        private const string curatorRole = "Curator";
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IUserRoleService _userRoleService;
        private readonly IGroupService _groupService;

        public UserGroupService(
            AppDbContext context,
            IMapper mapper,
            IUserService userService,
            IUserRoleService userRoleService,
            IGroupService groupService)
            : base(context)
        {
            _mapper = mapper;
            _userService = userService;
            _userRoleService = userRoleService;
            _groupService = groupService;
        }

        public List<UserGroup> GetAllGroups() // TODO
        {
            var result = _context.UserGroups
                .Include(u => u.Group)
                .Include(u => u.User)
                .ToList();

            return result;
        }

        public async Task<UserGroup> AddUserToGroup(Guid userId, string numberOfGroup)
        {
            if(userId == Guid.Empty)
            {
                throw new Exception("User id is empty");
            }

            var group = _groupService.GetByNumber(numberOfGroup);

            if(group == null)
            {
                throw new Exception("Group does not exist");
            }

            var userGroup = new UserGroup() { UserId = userId, GroupId = group.Id };
            var result = await Insert(userGroup);
            
            if(result.UserId == Guid.Empty || result.GroupId == Guid.Empty)
            {
                throw new Exception("Adding user to group failed");
            }

            return result;
        }

        public async Task AssignCurator(Guid id)
        {
            if(id == Guid.Empty)
            {
                throw new Exception("Curator id is empty");
            }

            await _userRoleService.GrantToRole(id, curatorRole);
        }

        public async Task AddMemberToGroup(List<Guid> userIds, Guid groupId)
        {
            if(groupId == Guid.Empty)
            {
                throw new Exception("Group id is empty");
            }

            if(_groupService.GetById(groupId) == null)
            {
                throw new Exception("Group does not exist");
            }

            foreach(var uId in userIds)
            {
                var record = new UserGroup() { GroupId = groupId, UserId = uId };
                var result = await Insert(record);

                if (result.Id == Guid.Empty)
                {
                    throw new Exception("Adding member to group failed");
                }
            }
        }
    }
}

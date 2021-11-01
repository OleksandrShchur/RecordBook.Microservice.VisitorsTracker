using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Db.EFCore;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Core.Services
{
    public class GroupService : BaseService<Group>, IGroupService
    {
        private readonly IMapper _mapper;

        public GroupService(
            AppDbContext context,
            IMapper mapper)
            : base(context)
        {
            _mapper = mapper;
        }

        public Group GetByNumber(string groupNumber)
        {
            var result = _context.Groups
                .Where(g => g.Number == groupNumber)
                .FirstOrDefault();

            return result;
        }

        public async Task<Group> CreateGroup(string numberOfGroup)
        {
            if(numberOfGroup == null)
            {
                throw new Exception("Number of group is null");
            }

            if (GetByNumber(numberOfGroup) != null)
            {
                throw new Exception("Group already exist in db");
            }

            var record = new Group() { Number = numberOfGroup };
            var result = await Insert(record);

            if(result.Id == Guid.Empty)
            {
                throw new Exception("Adding new group failed");
            }

            return result;
        }

        public List<GroupListViewModel> GetAll()
        {
            var result = _context.Groups
                .Select(g => _mapper.Map<Group, GroupListViewModel>(g))
                .ToList();

            return result;
        }

        public Group GetById(Guid id)
        {
            var result = _context.Groups
                .Include(g => g.UserGroups)
                    .ThenInclude(ug => ug.User)
                .FirstOrDefault(g => g.Id == id);

            return result;
        }
    }
}

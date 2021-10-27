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

namespace VisitorsTracker.Core.Services
{
    public class GroupService : BaseService<UserGroup>, IGroupService
    {
        private readonly IMapper _mapper;

        public GroupService(
            AppDbContext context,
            IMapper mapper)
            : base(context)
        {
            _mapper = mapper;
        }

        public List<UserGroup> GetAllGroups()
        {
            var result = _context.UserGroups
                .Include(u => u.Group)
                .Include(u => u.User)
                .ToList();

            return result;
        }
    }
}

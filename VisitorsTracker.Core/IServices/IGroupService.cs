using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Core.IServices
{
    public interface IGroupService
    {
        Group GetByNumber(string numberOfGroup);

        Task<Group> CreateGroup(string numberOfGroup);

        List<GroupListViewModel> GetAll();

        Group GetById(Guid id);
    }
}

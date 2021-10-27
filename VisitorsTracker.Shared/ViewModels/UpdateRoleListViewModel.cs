using System;
using System.Collections.Generic;

namespace VisitorsTracker.Shared.ViewModels
{
    public class UpdateRoleListViewModel
    {
        public Guid Id { get; set; }

        public List<RoleItemViewModel> Roles { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace VisitorsTracker.Shared.ViewModels
{
    public class UserListViewModel
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string Avatar { get; set; }

        public IList<RoleItemViewModel> Roles { get; set; }
    }
}

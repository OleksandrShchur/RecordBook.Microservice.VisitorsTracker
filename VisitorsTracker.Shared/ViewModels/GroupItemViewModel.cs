using System;
using System.Collections.Generic;

namespace VisitorsTracker.Shared.ViewModels
{
    public class GroupItemViewModel
    {
        public Guid GroupId { get; set; }

        public UserProfileViewModel Curator { get; set; }

        public string Number { get; set; }

        public List<UserListViewModel> GroupMembers { get; set; }
    }
}

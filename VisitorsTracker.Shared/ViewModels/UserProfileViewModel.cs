using System;
using System.Collections.Generic;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.Enums;

namespace VisitorsTracker.Shared.ViewModels
{
    public class UserProfileViewModel
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime Birthday { get; set; }

        public Gender Gender { get; set; }

        public string Avatar { get; set; }

        public IList<RoleItemViewModel> Roles { get; set; }

        public IList<Group> Groups { get; set; }
    }
}

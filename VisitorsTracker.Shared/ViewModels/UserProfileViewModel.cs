using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public string PhotoUrl { get; set; }

        public IList<UserRole> UserRoles { get; set; }

        public IList<UserGroup> UserGroups { get; set; }
    }
}

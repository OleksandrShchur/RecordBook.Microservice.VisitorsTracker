using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Web.ViewModels
{
    public class UserProfileViewModel
    {
        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime Birthday { get; set; }

        public int Gender { get; set; }

        public string PhotoUrl { get; set; }

        public IList<UserRole> UserRoles { get; set; }

        public IList<UserGroup> UserGroups { get; set; }
    }
}

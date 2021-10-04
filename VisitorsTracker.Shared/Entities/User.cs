using System;
using System.Collections.Generic;
using VisitorsTracker.Shared.Enums;

namespace VisitorsTracker.Shared.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime Birthday { get; set; }

        public Gender Gender { get; set; }

        public string PhotoUrl { get; set; }

        public string Password { get; set; }

        public string Salt { get; set; }

        public IList<UserRole> UserRoles { get; set; }

        public IList<UserGroup> UserGroups { get; set; }
    }
}

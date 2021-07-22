﻿using System;

namespace VisitorsTracker.Shared.Entities
{
    public class UserRole : BaseEntity
    {
        public Guid UserId { get; set; }

        public User User { get; set; }

        public Guid RoleId { get; set; }

        public Role Role { get; set; }
    }
}

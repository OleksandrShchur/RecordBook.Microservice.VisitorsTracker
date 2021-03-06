using System;

namespace VisitorsTracker.Shared.Entities
{
    public class UserGroup : BaseEntity
    {
        public Guid UserId { get; set; }

        public User User { get; set; }

        public Guid GroupId { get; set; }

        public Group Group { get; set; }
    }
}

using System.Collections.Generic;

namespace VisitorsTracker.Shared.Entities
{
    public class Role : BaseEntity
    {
        public string Name { get; set; }

        public IList<UserRole> UserRoles { get; set; }
    }
}

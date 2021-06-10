using System.Collections.Generic;

namespace VisitorsTracker.Shared.Entities
{
    public class Group : BaseEntity
    {
        public string Number { get; set; }

        public IList<UserGroup> UserGroups { get; set; }
    }
}

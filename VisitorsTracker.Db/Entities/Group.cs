using System.Collections.Generic;

namespace VisitorsTracker.Db.Entities
{
    public class Group : BaseEntity 
    {
        public string Number { get; set; }

        public IList<UserGroup> UserGroups { get; set; }
    }
}

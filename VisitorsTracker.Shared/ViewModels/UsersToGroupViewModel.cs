using System;
using System.Collections.Generic;

namespace VisitorsTracker.Shared.ViewModels
{
    public class UsersToGroupViewModel
    {
        public List<Guid> UserIds { get; set; }

        public Guid GroupId { get; set; }
    }
}

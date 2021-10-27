using System;
using VisitorsTracker.Shared.Enums;

namespace VisitorsTracker.Shared.ViewModels
{
    public class UserCreateViewModel
    {
        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime Birthday { get; set; }

        public string Password { get; set; }

        public Gender Gender { get; set; }
    }
}

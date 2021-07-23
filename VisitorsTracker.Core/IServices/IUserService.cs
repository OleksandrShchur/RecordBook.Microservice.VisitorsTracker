using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Core.IServices
{
    public interface IUserService
    {
        Task<User> Create(User user);

        User GetByEmail(string email);

        List<User> GetAllUsers();

        User Authenticate(User user);
    }
}

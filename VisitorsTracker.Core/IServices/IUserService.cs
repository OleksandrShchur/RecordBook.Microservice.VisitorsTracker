using System.Collections.Generic;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Core.IServices
{
    public interface IUserService
    {
        Task<User> Create(UserCreateViewModel user);

        User GetByEmail(string email);

        List<User> GetAllUsers();

        User Authenticate(UserLoginViewModel user);
    }
}

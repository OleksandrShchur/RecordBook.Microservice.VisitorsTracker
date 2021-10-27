using System;
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

        User GetById(Guid id);

        List<UserListViewModel> GetAllUsers();

        User Authenticate(UserLoginViewModel user);

        Task DeleteUser(Guid id);
    }
}

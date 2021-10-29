using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Core.Infrustructure;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Db.EFCore;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Core.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IUserRoleService _userRoleService;
        private readonly IMapper _mapper;
        private const string defaultRole = "Guest";

        public UserService(
            AppDbContext context,
            IUserRoleService userRoleService,
            IMapper mapper) 
            : base(context)
        {
            _userRoleService = userRoleService;
            _mapper = mapper;
        }

        public async Task<User> Create(UserCreateViewModel newUser)
        {
            if(UserExistence(newUser.Email))
            {
                throw new Exception("User already exist in database");
            }

            var user = _mapper.Map<UserCreateViewModel, User>(newUser);

            (user.Password, user.Salt) = PasswordHasher.GenerateHash(user.Password);
            var result = await Insert(user);

            if(result.Email != user.Email || result.Id == Guid.Empty)
            {
                throw new Exception("Adding user failed");
            }

            await _userRoleService.GrantToRole(result.Id, defaultRole);

            return result;
        }

        public User GetByEmail(string email)
        {
            var user = _context.Users
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.Role)
                .FirstOrDefault(u => u.Email == email);

            return user;
        }

        public User GetById(Guid id)
        {
            var user = _context.Users
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.Role)
                .FirstOrDefault(u => u.Id == id);

            return user;
        }

        public List<UserListViewModel> GetAllUsers()
        {
            var users = _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(u => u.Role)
                .Select(u => _mapper.Map<User, UserListViewModel>(u))
                .ToList();

            return users;
        }

        public User Authenticate(UserLoginViewModel user)
        {
            var userFromDb = GetByEmail(user.Email);

            if(userFromDb != null && userFromDb?.Password != PasswordHasher.HashPassword(user.Password, userFromDb?.Salt))
            {
                throw new Exception("Passwords does not match");
            }

            return userFromDb;
        }

        public async Task DeleteUser(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new Exception("User id is null");
            }

            var user = GetById(id);

            await Delete(user);
        }

        private bool UserExistence(string userEmail)
        {
            var userExist = GetByEmail(userEmail) != null && !string.IsNullOrEmpty(userEmail);

            return userExist;
        }
            
    }
}

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
            var result = await InsertAsync(user);

            if(result.Email != user.Email || result.Id == Guid.Empty)
            {
                throw new Exception("Adding user failed");
            }

            await _userRoleService.GrandDefaultRole(result.Id);

            return result;
        }

        public User GetByEmail(string email)
        {
            return _context.Users
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.Role)
                .FirstOrDefault(u => u.Email == email);
        }

        public List<User> GetAllUsers() => _context.Users.ToList();

        public User Authenticate(UserLoginViewModel user)
        {
            var userFromDb = GetByEmail(user.Email);

            if(userFromDb != null && userFromDb?.Password != PasswordHasher.HashPassword(user.Password, userFromDb?.Salt))
            {
                throw new Exception("Passwords does not match");
            }

            return userFromDb;
        }

        private bool UserExistence(string userEmail) => 
            GetByEmail(userEmail) != null && !string.IsNullOrEmpty(userEmail);
    }
}

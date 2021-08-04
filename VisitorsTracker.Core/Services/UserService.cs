using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Core.Infrustructure;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Db.EFCore;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Core.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        public UserService(
            AppDbContext context) 
            : base(context)
        {

        }

        public async Task<User> Create(User user)
        {
            if(UserExistence(user))
            {
                throw new Exception("User already exist in database");
            }

            (user.Password, user.Salt) = PasswordHasher.GenerateHash(user.Password);

            var result = await InsertAsync(user);

            if(result.Email != user.Email || result.Id == Guid.Empty)
            {
                throw new Exception("Adding failed");
            }

            return result;
        }

        public User GetByEmail(string email) => _context.Users.FirstOrDefault(u => u.Email == email);

        public List<User> GetAllUsers() => _context.Users.ToList();

        public User Authenticate(User user)
        {
            var userFromDb = GetByEmail(user.Email);

            if(userFromDb.Password != PasswordHasher.HashPassword(user.Password, userFromDb.Salt))
            {
                throw new Exception("Passwords does not match");
            }

            return user;
        }

        private bool UserExistence(User user) => 
            GetByEmail(user.Email) != null && !string.IsNullOrEmpty(user.Email);
    }
}

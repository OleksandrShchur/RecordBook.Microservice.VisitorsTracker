using Moq;
using NUnit.Framework;
using System;
using NUnit.Framework.Internal;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Core.Services;
using VisitorsTracker.Shared.Entities;

namespace VisitorsTracker.Test.ServiceTests
{
    [TestFixture]
    internal class UserServiceTests : TestInitializer
    {
        private static Mock<IUserRoleService> mockUserRoleService;
        private UserService userService;

        private User userExisting;
        private User secondUser;

        private Guid userId = Guid.NewGuid();
        private string existingEmail = "existingEmail@gmail.com";

        private Guid secondUserId = Guid.NewGuid();
        private string secondEmail = "secondEmail@gmail.com";

        [SetUp]
        protected override void Initialize()
        {
            base.Initialize();

            mockUserRoleService = new Mock<IUserRoleService>();

            userService = new UserService(
                Context,
                mockUserRoleService.Object,
                MockMapper.Object);

            userExisting = new User
            {
                Id = userId,
                Email = existingEmail
            };

            secondUser = new User
            {
                Id = secondUserId,
                Email = secondEmail
            };

            Context.Users.Add(userExisting);
            Context.Users.Add(secondUser);

            Context.SaveChanges();
        }


    }
}

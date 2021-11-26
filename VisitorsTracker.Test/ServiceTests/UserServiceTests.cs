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
using VisitorsTracker.Shared.ViewModels;
using VisitorsTracker.Shared.Enums;

namespace VisitorsTracker.Test.ServiceTests
{
    [TestFixture]
    internal class UserServiceTests : TestInitializer
    {
        private static Mock<IUserRoleService> mockUserRoleService;
        private UserService userService;

        private User userExisting;
        private User secondUser;
        private UserCreateViewModel userModel;

        private static Guid userId = Guid.NewGuid();
        private static string existingEmail = "existingEmail@gmail.com";
        private static string existingPass = "LdRHlAyKdOc8HSTk1P1zL9unfxMOp1gIgffDoY4TaAA=";
        private static string existingSalt = "�_��*\u0014�\0��IB�Bi�";
        private static string existingPassWithoutHash = "ExistingPass-1";

        private static Guid secondUserId = Guid.NewGuid();
        private static string secondEmail = "secondEmail@gmail.com";

        private static string userToAddEmail = "newUser@gmail.com";
        private static string userToAddPass = "newUserPass-1";
        private static string userToAddPhone = "+38098424256";
        private static DateTime userToAddBirthday = DateTime.Now;
        private static Gender userToAddGender = Gender.Male;

        private static User userToAdd = new User
        {
            Email = userToAddEmail,
            Phone = userToAddPhone,
            Password = userToAddPass,
            Birthday = userToAddBirthday,
            Gender = userToAddGender,
        };

        [SetUp]
        protected override void Initialize()
        {
            base.Initialize();

            mockUserRoleService = new Mock<IUserRoleService>();

            userModel = new UserCreateViewModel()
            {
                Email = userToAddEmail,
                Password = userToAddPass,
                Phone = userToAddPhone,
                Birthday = userToAddBirthday,
                Gender = userToAddGender
            };

            MockMapper.Setup(opts => opts.Map<UserCreateViewModel, User>(userModel))
                .Returns(userToAdd);

            userService = new UserService(
                Context,
                mockUserRoleService.Object,
                MockMapper.Object);

            userExisting = new User
            {
                Id = userId,
                Email = existingEmail,
                Password = existingPass,
                Salt = existingSalt,
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

        [Test]
        public void Create_CorrectViewModel_DoesNotThrow()
        {
            Assert.DoesNotThrowAsync(() => userService.Create(userModel));
        }

        [Test]
        public void Create_UserExist_Throw()
        {
            var userExistingModel = new UserCreateViewModel()
            {
                Email = userExisting.Email,
                Password = userExisting.Password,
                Phone = userExisting.Phone,
                Birthday = userExisting.Birthday,
            };

            Assert.ThrowsAsync<Exception>(async () => await userService.Create(userExistingModel));
        }

        [Test]
        public void GetByEmail_EmailExist_DoesNotThrow()
        {
            Assert.DoesNotThrow(() => userService.GetByEmail(userExisting.Email));
        }

        [Test] 
        public void GetAllUsers_DoesNotThrow()
        {
            Assert.DoesNotThrow(() => userService.GetAllUsers());
        }

        [Test]
        public void Authenticate_UserCorrect_DoesNotThrow()
        {
            UserLoginViewModel userLogin = new UserLoginViewModel()
            {
                Email = userExisting.Email,
                Password = existingPassWithoutHash
            };

            Assert.DoesNotThrow(() => userService.Authenticate(userLogin));
        }

        [Test]
        public void DeleteUser_UserExist_DoesNotThrow()
        {
            Assert.DoesNotThrowAsync(async() => await userService.DeleteUser(userId));
        }

        [Test]
        public void DeleteUser_GuidEmpty_Throw()
        {
            Assert.ThrowsAsync<Exception>(async () => await userService.DeleteUser(Guid.Empty));
        }
    }
}
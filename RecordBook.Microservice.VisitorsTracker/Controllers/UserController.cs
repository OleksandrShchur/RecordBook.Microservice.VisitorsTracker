using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(
            IUserService userService,
            IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var newUser = _mapper.Map<User, UserProfileViewModel>(await _userService.Create(user));

            return Ok(newUser);
        }

        [HttpGet]
        [Route("GetUsers")]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(UserLoginViewModel user)
        {
            var loggedInUser = _mapper.Map<User, UserProfileViewModel>(_userService.Authenticate(user));

            return Ok(loggedInUser);
        }
    }
}

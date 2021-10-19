using Microsoft.AspNetCore.Mvc;
using System;
using VisitorsTracker.Core.IServices;

namespace VisitorsTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly IUserRoleService _userRoleService;

        public RoleController(
            IUserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }

        [HttpPost]
        [Route("PromoteUser")]
        public IActionResult PromoteUser(Guid userId, string roleName)
        {
            return Ok();
        }
    }
}

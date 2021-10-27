using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Shared.ViewModels;

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

        [HttpGet]
        [Route("GetAllRoles")]
        public IActionResult GetAllRoles()
        {
            var roles = _userRoleService.GetAll();

            return Ok(roles);
        }

        [HttpPost]
        [Route("ChangeUserRoles")]
        public IActionResult ChangeUserRoles(UpdateRoleListViewModel user)
        {
            return Ok(_userRoleService.UpdateUserRoles(user));
        }
    }
}

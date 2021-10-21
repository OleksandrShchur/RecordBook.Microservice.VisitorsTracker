using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        [Route("GetAllRoles")]
        public IActionResult GetAllRoles()
        {
            var roles = _userRoleService.GetAll();

            return Ok(roles);
        }
    }
}

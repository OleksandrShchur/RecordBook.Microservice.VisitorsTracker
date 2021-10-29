using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;

namespace VisitorsTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {
        private readonly IUserGroupService _userGroupService;
        private readonly IGroupService _groupService;

        public GroupController(
            IUserGroupService userGroupService,
            IGroupService groupService) 
        {
            _userGroupService = userGroupService;
            _groupService = groupService;
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            var result = _groupService.GetAll();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetByNumber")]
        public IActionResult GetByNumber(string number)
        {
            var result = _groupService.GetByNumber(number);

            return Ok(result);
        }

        [HttpPost]
        [Route("AddGroup")]
        public IActionResult AddGroup(string number)
        {
            var result = _groupService.CreateGroup(number);

            return Ok(result);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;

namespace VisitorsTracker.Web.Controllers
{
    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;

        public GroupController(
            IGroupService groupService) 
        {
            _groupService = groupService;
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            _groupService.GetAllGroups();

            return Ok();
        }
    }
}

﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace VisitorsTracker.Web.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var UserId = context.HttpContext.Items["UserId"];
            if (UserId == null)
            {
                // not logged in
                context.Result = new JsonResult(
                    new { message = "Unauthorized" }) 
                { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}

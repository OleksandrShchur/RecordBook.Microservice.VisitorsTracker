using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Web.Helpers;

namespace VisitorsTracker.Web.Middlewares
{
    public class TokenMiddleware
    {
        private TokenHelper _tokenHelper = new TokenHelper();
        private readonly RequestDelegate _next;

        public TokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
            {
                await AttachAccountToContext(context, token);
            }
            await _next(context);
        }

        private async Task AttachAccountToContext(HttpContext context, string token)
        {
            try
            {
                var UserId = _tokenHelper.ValidateJwtToken(token);
                // on successful jwt validation attach UserId to context
                context.Items["UserId"] = UserId;
            }
            catch
            {
                // if jwt validation fails then do nothing 
            }
        }
    }
}

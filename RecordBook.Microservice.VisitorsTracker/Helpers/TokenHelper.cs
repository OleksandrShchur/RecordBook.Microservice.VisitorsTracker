using Microsoft.IdentityModel.Tokens;
using IdentityServer4.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace VisitorsTracker.Web.Helpers
{
    public class TokenHelper
    {
        public int? ValidateJwtToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("key".Sha256());
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var UserId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                // if validation is successful then return UserId from JWT token 
                return UserId;
            }
            catch(Exception error)
            {
                // if validation fails then return null
                return null;
            }
        }
    }
}

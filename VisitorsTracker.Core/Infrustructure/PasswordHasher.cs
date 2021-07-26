using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Text;

namespace VisitorsTracker.Core.Infrustructure
{
    public class PasswordHasher
    {
        public static string GenerateHash(string password)
        {
            byte[] salt = Encoding.ASCII.GetBytes("NZsP6NnmfBuYeJrrAKNuVQ==");

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
        }
    }
}

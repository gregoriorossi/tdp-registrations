using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using TDPRegistrations.Core.Entities;
using TDPRegistrations.Core.Interfaces.Repositories;
using TDPRegistrationsAPI.Web.Constants;
using TDPRegistrationsAPI.Web.Helpers;
using TDPRegistrationsAPI.Web.ViewModels.Requests;
using JWTConsts = TDPRegistrationsAPI.Web.Constants.Consts.Config.JWT;

namespace TDPRegistrationsAPI.Web.Controllers
{
    [ApiController]
    [Route(Consts.DefaultApiRoute)]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsersRepository _usersRepository;

        public AuthController(
            IUsersRepository usersRepository,
            IConfiguration configuration)
        {
            _configuration = configuration;
            _usersRepository = usersRepository;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginVM model, CancellationToken cancellationToken)
        {
            User? user = await _usersRepository.Get(model.Username, cancellationToken);
            if (user == null || !PasswordHasher.Verify(model.Password, user.PasswordHash) )
            {
                return Unauthorized();
            }

            var token = TokenHelper.CreateToken(user.Username, _configuration[JWTConsts.Key]!, _configuration[JWTConsts.Issuer]!, Consts.Roles.EDITOR);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}

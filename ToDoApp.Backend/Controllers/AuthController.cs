using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ToDoApp.Backend.Models;

namespace ToDoApp.Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController(UserManager<AppUser> userManager, IConfiguration configuration) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IConfiguration _configuration = configuration;

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            // Basic null/empty checks
            if (string.IsNullOrWhiteSpace(dto.Username))
                return BadRequest("Username is required.");
            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest("Email is required.");
            if (string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Password is required.");

            // Email format validation
            try
            {
                var addr = new System.Net.Mail.MailAddress(dto.Email);
                if (addr.Address != dto.Email)
                    return BadRequest("Invalid email format.");
            }
            catch
            {
                return BadRequest("Invalid email format.");
            }

            // Password length check (example: min 6 chars)
            if (dto.Password.Length < 6)
                return BadRequest("Password must be at least 6 characters long.");

            // Check if username or email already exists
            if (await _userManager.FindByNameAsync(dto.Username) is not null)
                return BadRequest("Username already exists.");
            if (await _userManager.FindByEmailAsync(dto.Email) is not null)
                return BadRequest("Email already registered.");

            var user = new AppUser
            {
                UserName = dto.Username,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Registration successful.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user is null)
                return Unauthorized();

            var passwordMatch = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!passwordMatch)
                return Unauthorized();

            var accessToken = GenerateJwt(user);
            return Ok(new { accessToken });
        }

        private string GenerateJwt(AppUser user)
        {
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
                throw new InvalidOperationException("JWT key is not configured.");


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var claims = new Claim[]
            {
                new(ClaimTypes.NameIdentifier, user.Id),
                new(ClaimTypes.Name, user.UserName ?? string.Empty),
                new(ClaimTypes.MobilePhone, user.PhoneNumber ?? string.Empty)
            };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
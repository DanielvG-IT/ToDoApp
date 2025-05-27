using ToDoApp.Backend.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace ToDoApp.Backend.Controllers
{
  [ApiController]
  [Route("api/v1/[controller]")]
  public class UsersController(UserManager<AppUser> userManager) : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager = userManager;

    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId is null)
        return Unauthorized();

      var user = await _userManager.FindByIdAsync(userId);
      if (user is null)
        return NotFound();

      return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] AppUser updatedUser)
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId is null)
        return Unauthorized();

      if (userId != id.ToString())
        return Forbid();

      var user = await _userManager.FindByIdAsync(userId);
      if (user is null)
        return NotFound();

      user.UserName = updatedUser.UserName;
      user.Email = updatedUser.Email;
      // Update other fields as needed

      var result = await _userManager.UpdateAsync(user);
      if (!result.Succeeded)
        return BadRequest(result.Errors);

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
      var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId is null)
        return Unauthorized();

      if (userId != id.ToString())
        return Forbid();

      var user = await _userManager.FindByIdAsync(userId);
      if (user is null)
        return NotFound();

      var result = await _userManager.DeleteAsync(user);
      if (!result.Succeeded)
        return BadRequest(result.Errors);

      return NoContent();
    }
  }
}
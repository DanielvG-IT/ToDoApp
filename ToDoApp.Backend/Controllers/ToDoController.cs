using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Backend.Models;
using ToDoApp.Backend.Data;

namespace ToDoApp.Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]

    public class ToDoController(ToDoContext toDoContext) : ControllerBase
    {
        private readonly ToDoContext _context = toDoContext;

        [HttpPost]
        public async Task<IActionResult> CreateToDo(CreateTodoDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return NotFound();

            var ToDo = new ToDo { Id = Guid.NewGuid(), Title = dto.Title, Description = dto.Description, DueDate = dto.DueDate, Priority = dto.Priority, UserId = userId };

            await _context.ToDos.AddAsync(ToDo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new { id = ToDo.Id }, ToDo);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDo>>> GetMyTodos()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return NotFound();

            var todos = await _context.ToDos.Where(t => t.UserId == userId).ToListAsync();

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> GetTodo(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return NotFound();

            var todo = await _context.ToDos.Where(t => t.UserId == userId && t.Id == id).FirstOrDefaultAsync();
            if (todo is null)
                return NotFound();

            return Ok(todo);
        }

        // [HttpPut]
        // public async Task<IActionResult> UpdateToDo() { } // ! May wanna return the updated thing

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDo(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingToDo = await _context.ToDos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (existingToDo is null)
                return NotFound();

            _context.ToDos.Remove(existingToDo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ToDo>> MarkAsCompleted(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingToDo = await _context.ToDos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (existingToDo is null)
                return NotFound();

            existingToDo.IsCompleted = true;
            _context.ToDos.Update(existingToDo);
            await _context.SaveChangesAsync();

            return Ok(existingToDo);
        }
    }
}
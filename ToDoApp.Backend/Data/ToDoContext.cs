using ToDoApp.Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ToDoApp.Backend.Data
{
  public class ToDoContext(DbContextOptions<ToDoContext> opts) : IdentityDbContext<AppUser>(opts)
  {
    public DbSet<ToDo> ToDos => Set<ToDo>();
  }
}
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ToDoApp.Backend.Models
{
  public class AppUser : IdentityUser
  {
    public List<ToDo> Todos { get; set; } = [];
  }
}
using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Backend.Models
{
    public class ToDo
    {
        [Key]
        public Guid Id;

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public bool IsCompleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DueDate { get; set; }

        public PriorityLevel Priority { get; set; } = PriorityLevel.Normal;

        public string UserId { get; set; } = string.Empty;

        public AppUser User { get; set; } = default!;
    }
}
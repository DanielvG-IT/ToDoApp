namespace ToDoApp.Backend.Models
{
    public class CreateTodoDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public PriorityLevel Priority { get; set; } = PriorityLevel.Normal;
    }
}
using System.ComponentModel.DataAnnotations;

namespace Todo.Api.Models
{
    public class CreateTodo
    {
        [Required]
        [StringLength(100)]
        public string Value { get; set; }

        public bool IsComplete { get; } = false;
    }
}

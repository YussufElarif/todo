using System.ComponentModel.DataAnnotations;

namespace Todo.Api.Models
{
    public class CreateTodo
    {
        [Required]
        [StringLength(50)]
        public string Value { get; set; }

        public bool isComplete = false;
    }
}

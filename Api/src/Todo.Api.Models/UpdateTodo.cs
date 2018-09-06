using System.ComponentModel.DataAnnotations;

namespace Todo.Api.Models
{
    public class UpdateTodo
    {        
        [StringLength(100)]
        public string Value { get; set; }

        public bool? IsComplete { get; set; }
    }
}

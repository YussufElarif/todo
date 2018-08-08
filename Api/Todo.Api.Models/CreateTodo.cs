using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

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

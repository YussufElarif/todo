using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Todo.Api.Models
{
    public class PaginationParameters
    {
        public string Search { get; set; }

        [Required]
        public int Offset { get; set; }

        [Required]
        public int Limit { get; set; }
    }
}

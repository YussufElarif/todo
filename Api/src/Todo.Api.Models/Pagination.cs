using System.Collections.Generic;

namespace Todo.Api.Models
{
    public class Pagination<T>
    {
        public IEnumerable<T> Items { get; set; }

        public int Total { get; set; }
    }
}

using System;

namespace Todo.Entities
{
    public class TodoItem
    {
        public long Id { get; set; }

        public string Value { get; set; }

        public bool IsComplete { get; set; }

        public DateTime Created { get; set; }
    }
}

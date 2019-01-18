using System;

namespace Todo.Services.Exceptions
{
    public class TodoNotFoundException : Exception
    {
        public TodoNotFoundException(): base("Todo item does not exist")
        {
        }
    }
}

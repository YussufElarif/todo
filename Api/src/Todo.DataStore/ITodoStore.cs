using System.Collections.Generic;
using Todo.Entities;

namespace Todo.DataStore
{
    public interface ITodoStore
    {
        IEnumerable<TodoItem> GetTodoList();

        TodoItem GetTodoById(long id);

        void CreateTodoItem(TodoItem todoItem);

        void UpdateTodoItem(TodoItem todoItem);

        void DeleteTodoItem(TodoItem todoItem);
    }
}

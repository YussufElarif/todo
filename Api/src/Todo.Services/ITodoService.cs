using System.Collections.Generic;
using Todo.Api.Models;

namespace Todo.Services
{
    public interface ITodoService
    {
        IEnumerable<GetTodo> GetTodoList();

        GetTodo GetTodoById(long id);

        void CreateTodoItem(CreateTodo createTodoItem);

        void UpdateTodoItem(long id, UpdateTodo updateTodoItem);

        void DeleteTodoItem(long id);
    }
}

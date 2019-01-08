using System.Collections.Generic;
using Todo.Api.Models;

namespace Todo.Services
{
    public interface ITodoService
    {
        Pagination<GetTodo> GetTodoList(PaginationParameters paginationParameters);

        GetTodo GetTodoById(long id);

        GetTodo CreateTodoItem(CreateTodo createTodoItem);

        void UpdateTodoItem(long id, UpdateTodo updateTodoItem);

        void DeleteTodoItem(long id);
    }
}

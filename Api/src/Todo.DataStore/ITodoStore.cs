using System.Collections.Generic;
using Todo.Api.Models;
using Todo.Entities;

namespace Todo.DataStore
{
    public interface ITodoStore
    {
        int GetTodoTotal(PaginationParameters paginationParameters);

        IEnumerable<TodoItem> GetTodoList(PaginationParameters paginationParameters);

        TodoItem GetTodoById(long id);

        void CreateTodoItem(TodoItem todoItem);

        void UpdateTodoItem(TodoItem todoItem);

        void DeleteTodoItem(TodoItem todoItem);
    }
}

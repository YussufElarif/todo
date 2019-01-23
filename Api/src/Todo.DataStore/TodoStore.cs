using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Todo.Api.Models;
using Todo.DataAccess;
using Todo.Entities;

namespace Todo.DataStore
{
    public class TodoStore : ITodoStore
    {
        private readonly TodoContext _context;

        public TodoStore(TodoContext context)
        {
            _context = context;
        }

        public int GetTodoTotal(PaginationParameters paginationParameters)
        {
            IQueryable<TodoItem> list = _context.TodoItems;

            if (!string.IsNullOrEmpty(paginationParameters.Search))
            {
                list = list
                    .Where(todo => todo.Value.Contains(paginationParameters.Search, StringComparison.CurrentCultureIgnoreCase));
            }

            return list.Count();
        }

        public IEnumerable<TodoItem> GetTodoList (PaginationParameters paginationParameters)
        {
            IQueryable<TodoItem> list = _context.TodoItems;

            if (!string.IsNullOrEmpty(paginationParameters.Search))
            {
                list = list
                    .Where(todo => todo.Value.Contains(paginationParameters.Search, StringComparison.CurrentCultureIgnoreCase));
            }

            return list
                .OrderByDescending(todo => todo.Created)
                .Skip(paginationParameters.Offset)
                .Take(paginationParameters.Limit);
        }

        public TodoItem GetTodoById (long id)
        {
            return _context.TodoItems.Find(id);
        }

        public void CreateTodoItem (TodoItem todoItem)
        {
            _context.Add(todoItem);
            _context.SaveChanges();
        }

        public void UpdateTodoItem (TodoItem todoItem)
        {
            _context.Update(todoItem);
            _context.SaveChanges();
        }

        public void DeleteTodoItem (TodoItem todoItem)
        {
            _context.Remove(todoItem);
            _context.SaveChanges();
        }
    }
}

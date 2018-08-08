using System.Collections.Generic;
using System.Linq;
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

            if (_context.TodoItems.Count() == 0)
            {
                _context.TodoItems.Add(new TodoItem { Value = "Todo Item 1" });
                _context.SaveChanges();
            }
        }

        public IEnumerable<TodoItem> GetTodoList ()
        {
            return _context.TodoItems;
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

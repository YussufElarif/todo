using Microsoft.EntityFrameworkCore;
using Todo.Entities;

namespace Todo.DataAccess
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base (options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}

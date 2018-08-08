using System;
using Todo.Api.Models;
using Todo.Services;

namespace Todo.ScheduledTasks.Tasks
{
    public class TodoTask : ITodoTask
    {
        private readonly ITodoService _todoService;

        public TodoTask(ITodoService todoService)
        {
            _todoService = todoService ?? throw new ArgumentNullException(nameof(todoService));
        }

        public void DoWork(int versionNumber)
        {
            var todoItem = new CreateTodo()
            {
                Value = $"V{versionNumber}. This is a scheduled task that posts every 30 seconds."
            };

            _todoService.CreateTodoItem(todoItem);
        }
    }
}

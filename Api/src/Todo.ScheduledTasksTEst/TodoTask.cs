using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Todo.Api.Models;
using Todo.Services;

namespace Todo.ScheduledTasks.Tasks
{
    public class TodoTask : IHostedService, IDisposable
    {
        private int _versionNumber;
        private Timer _timer;
        private readonly ITodoService _todoService;
        private readonly ILogger<TodoTask> _logger;

        public TodoTask(ITodoService todoService, ILogger<TodoTask> logger)
        {
            _todoService = todoService ?? throw new ArgumentNullException(nameof(logger));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed background service is starting");

            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(30));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _logger.LogInformation("Timed background service is working");

            //_versionNumber += 1;

            //var todoItem = new CreateTodo()
            //{
            //    Value = $"V{_versionNumber}. This is a scheduled task that posts every 30 seconds."
            //};

            //_todoService.CreateTodoItem(todoItem);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Timed background service is stopping");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}

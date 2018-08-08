using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Todo.Api.Models;
using Todo.ScheduledTasks.Tasks;
using Todo.Services;

namespace Todo.ScheduledTasks
{
    public class ConsumeScopedServiceHostedService : IHostedService, IDisposable
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger _logger;
        private int _versionNumber;
        private Timer _timer;

        public ConsumeScopedServiceHostedService(IServiceProvider serviceProvider, ILogger<ConsumeScopedServiceHostedService> logger)
        {
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
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
            _logger.LogInformation("Timed background service is working.");

            using (var scope = _serviceProvider.CreateScope())
            {
                var scopedProcess = scope.ServiceProvider.GetRequiredService<ITodoTask>();
                _versionNumber += 1;
                scopedProcess.DoWork(_versionNumber);
            }
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

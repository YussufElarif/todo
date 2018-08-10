using Microsoft.Extensions.DependencyInjection;
using Todo.ScheduledTasks.Tasks;

namespace Todo.ScheduledTasks.Infrastructure
{
    public static class DependencyConfiguration
    {
        public static IServiceCollection AddScheduledTasks(this IServiceCollection service)
        {
            service.AddHostedService<ConsumeScopedServiceHostedService>()
                   .AddScoped<ITodoTask, TodoTask>();

            return service;
        }
    }
}

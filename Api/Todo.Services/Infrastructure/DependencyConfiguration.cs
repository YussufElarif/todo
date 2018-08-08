using Microsoft.Extensions.DependencyInjection;

namespace Todo.Services.Infrastructure
{
    public static class DependencyConfiguration
    {
        public static IServiceCollection AddServices(this IServiceCollection service)
        {
            service.AddTransient<ITodoService, TodoService>();

            return service;
        }
    }
}

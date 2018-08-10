using Microsoft.Extensions.DependencyInjection;

namespace Todo.DataStore.Infrastructure
{
    public static class DependencyConfiguration
    {
        public static IServiceCollection AddDataStore(this IServiceCollection service)
        {
            service.AddTransient<ITodoStore, TodoStore>();

            return service;
        }
    }
}

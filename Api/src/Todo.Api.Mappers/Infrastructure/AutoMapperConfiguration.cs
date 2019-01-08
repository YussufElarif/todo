using AutoMapper;

namespace Todo.Api.Mappers.Infrastructure
{
    public static class AutoMapperConfiguration
    {
        public static IMapperConfigurationExpression AddApiProfiles(this IMapperConfigurationExpression config)
        {
            config.AddProfile<CreateTodoToTodoItemProfile>();
            config.AddProfile<IEnumerableTodoItemToPaginationGetTodo>();

            return config;
        }
    }
}

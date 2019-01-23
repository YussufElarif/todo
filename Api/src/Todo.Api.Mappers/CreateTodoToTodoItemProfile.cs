using System;
using AutoMapper;
using Todo.Entities;
using Todo.Api.Models;

namespace Todo.Api.Mappers
{
    public class CreateTodoToTodoItemProfile : Profile
    {
        public CreateTodoToTodoItemProfile()
        {
            CreateMap<CreateTodo, TodoItem>()
                .ForMember(ct => ct.Id, opt => opt.Ignore())
                .ForMember(ct => ct.Created, opt => opt.MapFrom(src => DateTime.Now));
        }
    }
}

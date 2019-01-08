using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Todo.Api.Models;
using Todo.Entities;

namespace Todo.Api.Mappers
{
    public class IEnumerableTodoItemToPaginationGetTodo : Profile
    {
        public IEnumerableTodoItemToPaginationGetTodo()
        {
            CreateMap<IEnumerable<TodoItem>, Pagination<GetTodo>>()
                .ForMember(ct => ct.Items, opt => opt.MapFrom(src => src));
        }
    }
}

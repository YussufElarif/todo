using System;
using System.Collections.Generic;
using AutoMapper;
using Todo.DataStore;
using Todo.Entities;
using Todo.Api.Models;
using Todo.Services.Exceptions;

namespace Todo.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoStore _todoStore;

        private readonly IMapper _mapper;

        public TodoService(ITodoStore todoStore, IMapper mapper)
        {
            _todoStore = todoStore ?? throw new ArgumentNullException(nameof(todoStore));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public Pagination<GetTodo> GetTodoList(PaginationParameters paginationParameters)
        {
            var todoList = _todoStore.GetTodoList(paginationParameters);

            var mapper = _mapper.Map<Pagination<GetTodo>>(todoList);
            mapper.Total = _todoStore.GetTodoTotal(paginationParameters);

            return mapper;
        }

        public GetTodo GetTodoById (long id)
        {
            var todoItem = _todoStore.GetTodoById(id);

            if (todoItem == null)
            {
                throw new TodoNotFoundException();
            }

            return _mapper.Map<GetTodo>(todoItem);
        }

        public GetTodo CreateTodoItem(CreateTodo createTodoItem)
        {
            var mappedTodoItem = _mapper.Map<TodoItem>(createTodoItem);

            _todoStore.CreateTodoItem(mappedTodoItem);

            return _mapper.Map<GetTodo>(mappedTodoItem);
        }

        public void UpdateTodoItem(long id, UpdateTodo updateTodoItem)
        {
            var todoItem = _todoStore.GetTodoById(id);

            if (todoItem == null)
            {
                throw new TodoNotFoundException();
            }

            if (updateTodoItem.Value != null)
            {
                todoItem.Value = updateTodoItem.Value;
            }

            if (updateTodoItem.IsComplete != null)
            {
                todoItem.IsComplete = (bool)updateTodoItem.IsComplete;
            }

            _todoStore.UpdateTodoItem(todoItem);
        }

        public void DeleteTodoItem(long id)
        {
            var todoItem = _todoStore.GetTodoById(id);

            if (todoItem == null)
            {
                throw new TodoNotFoundException();
            }

            _todoStore.DeleteTodoItem(todoItem);
        }
    }
}

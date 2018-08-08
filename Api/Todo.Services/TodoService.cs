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

        public IEnumerable<GetTodo> GetTodoList()
        {
            var todoList = _todoStore.GetTodoList();
            return _mapper.Map<IEnumerable<GetTodo>>(todoList);
        }

        public GetTodo GetTodoById (long id)
        {
            var todoItem = _todoStore.GetTodoById(id);

            if (todoItem == null)
            {
                throw new TodoNotFoundException("Todo item does not exist");
            }

            return _mapper.Map<GetTodo>(todoItem);
        }

        public void CreateTodoItem(CreateTodo createTodoItem)
        {
            var mappedTodoItem = _mapper.Map<TodoItem>(createTodoItem);
            _todoStore.CreateTodoItem(mappedTodoItem);
        }

        public void UpdateTodoItem(long id, UpdateTodo updateTodoItem)
        {
            var todoItem = _todoStore.GetTodoById(id);

            if (todoItem == null)
            {
                throw new TodoNotFoundException("Todo item does not exist");
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
                throw new TodoNotFoundException("Todo item does not exist");
            }

            _todoStore.DeleteTodoItem(todoItem);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Todo.Api.Models;
using Todo.Services;
using Todo.Services.Exceptions;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService ?? throw new ArgumentNullException(nameof(todoService));
        }

        [HttpGet]
        public ActionResult<IEnumerable<GetTodo>> GetList()
        {
            return Ok(_todoService.GetTodoList());
        }

        [HttpGet("{id}")]
        public ActionResult<GetTodo> GetById(long id)
        {
            try
            {
                return Ok(_todoService.GetTodoById(id));
            }
            catch (TodoNotFoundException err)
            {
                return NotFound(err.Message);
            }
        }


        [HttpPost]
        public ActionResult CreateTodoItem([FromBody] CreateTodo todoItem)
        {
            _todoService.CreateTodoItem(todoItem);
            return Created(Request?.Path.Value, null);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateTodoItem(long id, [FromBody] UpdateTodo todoItem)
        {
            try
            {
                _todoService.UpdateTodoItem(id, todoItem);
                return NoContent();
            }
            catch (TodoNotFoundException err)
            {
                return NotFound(err.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTodoItem(long id)
        {
            try
            {
                _todoService.DeleteTodoItem(id);
                return NoContent();
            }
            catch (TodoNotFoundException err)
            {
                return NotFound(err.Message);
            }
        }
    }
}
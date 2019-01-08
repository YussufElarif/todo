using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<TodoController> _logger;

        public TodoController(ITodoService todoService, ILogger<TodoController> logger)
        {
            _todoService = todoService ?? throw new ArgumentNullException(nameof(todoService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public ActionResult<IEnumerable<GetTodo>> GetList([FromQuery] PaginationParameters paginationParameters)
        {
            try
            {
                return Ok(_todoService.GetTodoList(paginationParameters));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred (HTTP 500): {0} {2}{3}", Request.Method, Request?.Path, Request.QueryString);
                return StatusCode((int)HttpStatusCode.InternalServerError, "Unexpected error occured");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<GetTodo> GetById(long id)
        {
            try
            {
                return Ok(_todoService.GetTodoById(id));
            }
            catch (TodoNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred (HTTP 500): {0} {2}{3}", Request.Method, Request.Path, Request.QueryString);
                return StatusCode((int)HttpStatusCode.InternalServerError, "Unexpected error occured");
            }
        }


        [HttpPost]
        public ActionResult CreateTodoItem([FromBody] CreateTodo todoItem)
        {
            try
            {
                var todo = _todoService.CreateTodoItem(todoItem);
                return Created(Request.Path.Value, todo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred (HTTP 500): {0} {2}{3}", Request.Method, Request.Path, Request.QueryString);
                return StatusCode((int)HttpStatusCode.InternalServerError, "Unexpected error occured");
            }
        }

        [HttpPut("{id}")]
        public ActionResult UpdateTodoItem(long id, [FromBody] UpdateTodo todoItem)
        {
            try
            {
                _todoService.UpdateTodoItem(id, todoItem);
                return NoContent();
            }
            catch (TodoNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred (HTTP 500): {0} {2}{3}", Request.Method, Request.Path, Request.QueryString);
                return StatusCode((int)HttpStatusCode.InternalServerError, "Unexpected error occured");
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
            catch (TodoNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred (HTTP 500): {0} {2}{3}", Request.Method, Request.Path, Request.QueryString);
                return StatusCode((int)HttpStatusCode.InternalServerError, "Unexpected error occured");
            }
        }
    }
}
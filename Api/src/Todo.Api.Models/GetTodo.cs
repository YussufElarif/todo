namespace Todo.Api.Models
{
    public class GetTodo
    {
        public long Id { get; set; }

        public string Value { get; set; }

        public bool IsComplete { get; set; }
    }
}

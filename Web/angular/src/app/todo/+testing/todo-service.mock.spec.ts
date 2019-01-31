import { of } from 'rxjs';

export class TodoServiceMock
{
    public getTodos()
    {
        return of();
    }

    public addTodo()
    {
        return of();
    }

    public updateTodo()
    {
        return of();
    }

    public deleteTodo()
    {
        return of();
    }
}
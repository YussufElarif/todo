import { Observable, of } from 'rxjs';

export class TodoServiceMock
{
    public getTodos(): Observable<any>
    {
        return of();
    }

    public addTodo(): Observable<any>
    {
        return of();
    }

    public updateTodo(): Observable<any>
    {
        return of();
    }

    public deleteTodo(): Observable<any>
    {
        return of();
    }
}
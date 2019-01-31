import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pagination } from '@todo/shared/models';

import { TodoQueryParams, Todo } from './models';

@Injectable({
    providedIn: 'root'
})
export class TodoService
{
    public readonly base = '/todo';

    constructor(
        private _http: HttpClient
    ) { }

    public getTodos(queryParams: TodoQueryParams): Observable<Pagination<Todo>>
    {
        // @ts-ignore - queryParam properties that don't have type string will fail
        return this._http.get<Pagination<Todo>>(this.base, { params: queryParams });
    }

    public addTodo(todo: Pick<Todo, 'value'>): Observable<Todo>
    {
        return this._http.post<Todo>(this.base, todo);
    }

    public updateTodo(id: string, todo: Partial<Todo>): Observable<void>
    {
        return this._http.put<void>(`${this.base}/${id}`, todo);
    }

    public deleteTodo(id: string): Observable<void>
    {
        return this._http.delete<void>(`${this.base}/${id}`);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddTodo, GetTodo, UpdateTodo, DeleteTodo, FilterTodo } from './state';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy
{
    public limit: number = 25;

    public todos: any;

    private _todoSub: Subscription;

    constructor(
        private _store: Store<any>
    ) { }

    public ngOnInit(): void
    {
        this._todoSub = this._store
            .select((state) => state.todoFeature)
            .subscribe(todo => this.todos = todo);

        this.filter({});
    }

    public ngOnDestroy(): void
    {
        this._todoSub.unsubscribe();
    }

    public paginate(pagination: any): void
    {
        this.getTodo({ ...pagination, limit: this.limit });
    }

    public filter(filters: any): void
    {
        this._store.dispatch(new FilterTodo.Pending({ ...filters.value, limit: this.limit, offset: 0 }));
    }

    public getTodo(filters: any): void
    {
        this._store.dispatch(new GetTodo.Pending(filters));
    }

    public addTodo(todo: any): void
    {
        this._store.dispatch(new AddTodo.Pending(todo.value));
    }

    public updateTodo(id: string, todo: any): void
    {
        this._store.dispatch(new UpdateTodo.Pending({ id, todo }));
    }

    public deleteTodo(id: string): void
    {
        this._store.dispatch(new DeleteTodo.Pending(id));
    }
}
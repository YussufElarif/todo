import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { GetTodoPending } from './state/get-todo.actions';
import { AddTodoPending } from './state/add-todo.action';
import { DelTodoPending } from './state/del-todo.action';
import { Subscription } from 'rxjs';
import { FilterTodoPending } from './state/filter-todo.action';

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
        this._store.dispatch(new FilterTodoPending({ ...filters.value, limit: this.limit, offset: 0 }));
    }

    public getTodo(filters: any): void
    {
        this._store.dispatch(new GetTodoPending(filters));
    }

    public addTodo(todo: any): void
    {
        this._store.dispatch(new AddTodoPending(todo.value));
    }

    public deleteTodo(id: string): void
    {
        this._store.dispatch(new DelTodoPending(id));
    }
}
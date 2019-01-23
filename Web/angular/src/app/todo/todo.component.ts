import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { PaginationQuery } from '@todo/shared/models';

import { AddTodo, GetTodo } from './+state';
import { TodoState, TodoQueryParams } from './models';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy
{
    public todos: TodoState;

    private _todoSub: Subscription;

    constructor(
        private _store: Store<any>,
        private _activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit(): void
    {
        this._todoSub = this._store
            .select((state) => state.todoFeature)
            .subscribe(todo => this.todos = todo);

        this._activatedRoute.queryParams.subscribe((params: TodoQueryParams) =>
        {
            this.getTodo({ offset: 0, limit: this.todos.limit, ...params });
        });
    }

    public ngOnDestroy(): void
    {
        this._todoSub.unsubscribe();
    }

    public paginate(filters?: PaginationQuery): void
    {
        this.getTodo({ ...this._activatedRoute.snapshot.queryParams, ...filters });
    }

    public getTodo(filters: TodoQueryParams): void
    {
        this._store.dispatch(new GetTodo.Pending(filters));
    }

    public addTodo(todo: any): void
    {
        this._store.dispatch(new AddTodo.Pending(todo.value));
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { PaginationQuery } from '@todo/shared/models';
import { AppState } from '@todo/app-state.model';

import { AddTodo, GetTodo } from './+state';
import { TodoState, TodoQueryParams } from './models';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy
{
    public state: TodoState;

    private _todoSub: Subscription;

    constructor(
        private _store: Store<AppState>,
        private _activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit(): void
    {
        this._todoSub = this._store
            .select(store => store.todos)
            .subscribe(state => this.state = state);

        this._activatedRoute.queryParams.subscribe((params: TodoQueryParams) =>
        {
            this.getTodo({ ...params, offset: 0, limit: this.state.limit });
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

    public addTodo(value: string): void
    {
        this._store.dispatch(new AddTodo.Pending(value));
    }
}
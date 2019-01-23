import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { AddTodo, GetTodo } from './state';
import { TodoState, TodoQueryParams } from './models';
import { map } from 'rxjs/operators';
import { PaginationQuery } from '@todo/shared/models';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy
{
    public limit: number = 25;

    public todos: TodoState;

    private _todoSub: Subscription;

    constructor(
        private _store: Store<any>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit(): void
    {
        this._todoSub = this._store
            .select((state) => state.todoFeature)
            .subscribe(todo => this.todos = todo);

        this._activatedRoute.queryParams.subscribe((params: TodoQueryParams) =>
        {
            this.getTodo({ offset: 0, limit: this.limit, ...params });
        });
    }

    public ngOnDestroy(): void
    {
        this._todoSub.unsubscribe();
    }

    public filter(form: NgForm): void
    {
        this._router.navigate([], { queryParams: { ...form.value } });
    }

    public paginate(filters?: PaginationQuery): void
    {
        this.getTodo({ ...this._activatedRoute.snapshot.queryParams, ...filters });
    }

    public getTodo(filters: TodoQueryParams): void
    {
        console.log(filters);
        this._store.dispatch(new GetTodo.Pending(filters));
    }

    public addTodo(todo: any): void
    {
        this._store.dispatch(new AddTodo.Pending(todo.value));
    }
}
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GetTodoPending } from './state/get-todo.actions';
import { Observable } from 'rxjs';
import { AddTodoPending } from './state/add-todo.action';
import { DelTodoPending } from './state/del-todo.action';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit
{
    public todo$: Observable<any> = this._store.select((state) => state.todoFeature);

    constructor(
        private _store: Store<any>
    ) { }

    public ngOnInit(): void
    {
        this._store.dispatch(new GetTodoPending());
    }

    public addTodo(todo: any): void
    {
        this._store.dispatch(new AddTodoPending(todo));
    }

    public deleteTodo(id: string): void
    {
        this._store.dispatch(new DelTodoPending(id));
    }
}
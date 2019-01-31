import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@todo/app-state.model';

import { Todo } from '../models';
import { UpdateTodo, DeleteTodo } from '../+state';

@Component({
    selector: 'todo-detail',
    templateUrl: './todo-detail.component.html'
})
export class TodoDetailComponent
{
    @Input()
    public todo: Todo;

    public edit: any;

    constructor(
        private _store: Store<AppState>
    ) { }

    public changeMode(): void
    {
        this.edit = !this.edit;
    }

    public changeCheck(id: string, isComplete: boolean): void
    {
        this.updateTodo(id, { isComplete });
    }

    public changeValue(id: string, value: string): void
    {
        // TODO: Consider understanding why or when the update is failed, don't change the state of edit
        this.updateTodo(id, { value });
        this.changeMode();
    }

    public cancelChange(input: HTMLInputElement): void
    {
        input.value = this.todo.value;
        this.changeMode();
    }

    public updateTodo(id: string, todo: Partial<Todo>): void
    {
        this._store.dispatch(new UpdateTodo.Pending({ id, todo }));
    }

    public deleteTodo(id: string): void
    {
        this._store.dispatch(new DeleteTodo.Pending(id));
    }
}
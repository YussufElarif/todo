import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { UpdateTodo, DeleteTodo } from '../state';

@Component({
    selector: 'todo-detail',
    templateUrl: './todo-detail.component.html'
})
export class TodoDetailComponent
{
    @Input()
    public todo: any;

    public edit: any;

    constructor(
        private _store: Store<any>
    ) { }

    public changeCheck(id: string, isComplete: boolean): void
    {
        this.updateTodo(id, { isComplete });
    }

    public changeValue(id: string, value: string): void
    {
        if (this.edit) {
            this.updateTodo(id, { value });
        }

        this.edit = !this.edit;
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
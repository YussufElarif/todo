import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { GetTodoActionsEnum, GetTodoPending, GetTodoSuccess, GetTodoError } from './get-todo.actions';
import { AddTodoActionsEnum, AddTodoPending, AddTodoSuccess, AddTodoError } from './add-todo.action';
import { DelTodoActionsEnum, DelTodoPending, DelTodoSuccess, DelTodoError } from './del-todo.action';

import { TodoService } from '../todo.service';

@Injectable()
export class TodoEffects
{
    @Effect()
    public getTodos$ = this._actions$.pipe(
        ofType(GetTodoActionsEnum.Pending),
        switchMap((action: GetTodoPending) => this._todoService.getTodos()
            .pipe(
                map((res: any) => new GetTodoSuccess(res)),
                catchError((err: any) => of(new GetTodoError(err)))
            )
        )
    );

    @Effect()
    public addTodo$ = this._actions$.pipe(
        ofType(AddTodoActionsEnum.Pending),
        switchMap((action: AddTodoPending) => this._todoService.addTodo()
            .pipe(
                map((res: any) => new AddTodoSuccess(res)),
                catchError((err: any) => of(new AddTodoError(err)))
            )
        )
    );

    @Effect()
    public delTodo$ = this._actions$.pipe(
        ofType(DelTodoActionsEnum.Pending),
        switchMap((action: DelTodoPending) => this._todoService.deleteTodo(action.payload)
            .pipe(
                map((res: any) => new DelTodoSuccess()),
                catchError((err: any) => of(new DelTodoError(err)))
            )
        )
    );

    constructor(
        private _actions$: Actions,
        private _todoService: TodoService
    ) { }
}
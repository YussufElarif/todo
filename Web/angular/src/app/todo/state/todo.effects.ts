import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError, mergeMap, concatMap } from 'rxjs/operators';

import { AddTodo } from './add-todo.action';
import { GetTodo } from './get-todo.action';
import { UpdateTodo } from './update-todo.action';
import { DeleteTodo } from './delete-todo.action';
import { FilterTodo } from './filter-todo.action';

import { TodoService } from '../todo.service';

@Injectable()
export class TodoEffects
{
    @Effect()
    public getTodos$ = this._actions$.pipe(
        ofType(GetTodo.Enum.Pending),
        switchMap((action: GetTodo.Pending) => this._todoService.getTodos(action.payload)
            .pipe(
                map((res: any) => new GetTodo.Success(res)),
                catchError((err: any) => of(new GetTodo.Error(err)))
            )
        )
    );

    @Effect()
    public filterTodo$ = this._actions$.pipe(
        ofType(FilterTodo.Enum.Pending),
        switchMap((action: FilterTodo.Pending) => this._todoService.getTodos(action.payload)
            .pipe(
                map((res: any) => new FilterTodo.Success(res)),
                catchError((err: any) => of(new FilterTodo.Error(err)))
            )
        )
    );

    @Effect()
    public addTodo$ = this._actions$.pipe(
        ofType(AddTodo.Enum.Pending),
        concatMap((action: AddTodo.Pending) => this._todoService.addTodo(action.payload)
            .pipe(
                map((res: any) => new AddTodo.Success(res)),
                catchError((err: any) => of(new AddTodo.Error(err)))
            )
        )
    );

    @Effect()
    public updateTodo$ = this._actions$.pipe(
        ofType(UpdateTodo.Enum.Pending),
        mergeMap((action: UpdateTodo.Pending) => this._todoService.updateTodo(action.payload.id, action.payload.todo)
            .pipe(
                map((res: any) => new UpdateTodo.Success(action.payload)),
                catchError((err: any) => of(new UpdateTodo.Error(err)))
            )
        )
    );

    @Effect()
    public delTodo$ = this._actions$.pipe(
        ofType(DeleteTodo.Enum.Pending),
        mergeMap((action: DeleteTodo.Pending) => this._todoService.deleteTodo(action.payload)
            .pipe(
                map((res: any) => new DeleteTodo.Success(action.payload)),
                catchError((err: any) => of(new DeleteTodo.Error(err)))
            )
        )
    );

    constructor(
        private _actions$: Actions,
        private _todoService: TodoService
    ) { }
}
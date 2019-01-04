import { Action } from '@ngrx/store';

export enum AddTodoActionsEnum
{
    Pending = '[AddTodo] Pending',
    Success = '[AddTodo] Success',
    Error = '[AddTodo] Error'
}

export class AddTodoPending implements Action
{
    public readonly type = AddTodoActionsEnum.Pending;

    constructor(
        public payload: any
    ) { }
}

export class AddTodoSuccess implements Action
{
    public readonly type = AddTodoActionsEnum.Success;

    constructor(
        public payload: any
    ) { }
}

export class AddTodoError implements Action
{
    public readonly type = AddTodoActionsEnum.Error;

    constructor(
        public payload: any
    ) { }
}

export type AddTodoActions = AddTodoPending | AddTodoSuccess | AddTodoError;
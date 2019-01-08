import { Action } from '@ngrx/store';

export enum GetTodoActionsEnum
{
    Pending = '[GetTodo] Pending',
    Success = '[GetTodo] Success',
    Error = '[GetTodo] Error'
}

export class GetTodoPending implements Action
{
    public readonly type = GetTodoActionsEnum.Pending;

    constructor(
        public payload: any
    ) { }
}

export class GetTodoSuccess implements Action
{
    public readonly type = GetTodoActionsEnum.Success;

    constructor(
        public payload: any
    ) { }
}

export class GetTodoError implements Action
{
    public readonly type = GetTodoActionsEnum.Error;

    constructor(
        public payload: any
    ) { }
}

export type GetTodoActions = GetTodoPending | GetTodoSuccess | GetTodoError;
import { Action } from '@ngrx/store';

export enum DelTodoActionsEnum
{
    Pending = '[DelTodo] Pending',
    Success = '[DelTodo] Success',
    Error = '[DelTodo] Error'
}

export class DelTodoPending implements Action
{
    public readonly type = DelTodoActionsEnum.Pending;
    
    constructor(
        public payload: any
    ) { }
}

export class DelTodoSuccess implements Action
{
    public readonly type = DelTodoActionsEnum.Success;
}

export class DelTodoError implements Action
{
    public readonly type = DelTodoActionsEnum.Error;

    constructor(
        public payload: any
    ) { }
}

export type DelTodoActions = DelTodoPending | DelTodoSuccess | DelTodoError;
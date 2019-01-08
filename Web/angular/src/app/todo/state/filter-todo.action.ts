import { Action } from '@ngrx/store';

export enum FilterTodoActionsEnum
{
    Pending = '[FilterTodo] Pending',
    Success = '[FilterTodo] Success',
    Error = '[FilterTodo] Error'
}

export class FilterTodoPending implements Action
{
    public readonly type = FilterTodoActionsEnum.Pending;

    constructor(
        public payload: any
    ) { }
}

export class FilterTodoSuccess implements Action
{
    public readonly type = FilterTodoActionsEnum.Success;

    constructor(
        public payload: any
    ) { }
}

export class FilterTodoError implements Action
{
    public readonly type = FilterTodoActionsEnum.Error;

    constructor(
        public payload: any
    ) { }
}

export type FilterTodoActions = FilterTodoPending | FilterTodoSuccess | FilterTodoError;
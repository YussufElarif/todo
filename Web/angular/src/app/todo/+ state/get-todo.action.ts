import { Action } from '@ngrx/store';

import { Pagination } from '@todo/shared/models';
import { TodoQueryParams, Todo } from '../models';

export namespace GetTodo
{
    export enum Enum
    {
        Pending = '[GetTodo] Pending',
        Success = '[GetTodo] Success',
        Error = '[GetTodo] Error'
    }

    export class Pending implements Action
    {
        public readonly type = Enum.Pending;

        constructor(
            public payload: TodoQueryParams
        ) { }
    }

    export class Success implements Action
    {
        public readonly type = Enum.Success;

        constructor(
            public payload: Pagination<Todo>
        ) { }
    }

    export class Error implements Action
    {
        public readonly type = Enum.Error;

        constructor(
            public payload: any
        ) { }
    }

    export type Types = Pending | Success | Error;
}
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

export namespace AddTodo
{
    export enum Enum
    {
        Pending = '[AddTodo] Pending',
        Success = '[AddTodo] Success',
        Error = '[AddTodo] Error'
    }
    
    export class Pending implements Action
    {
        public readonly type = Enum.Pending;
    
        constructor(
            public payload: any
        ) { }
    }
    
    export class Success implements Action
    {
        public readonly type = Enum.Success;
    
        constructor(
            public payload: any
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

export namespace UpdateTodo
{
    export enum Enum
    {
        Pending = '[UpdateTodo] Pending',
        Success = '[UpdateTodo] Success',
        Error = '[UpdateTodo] Error'
    }
    
    export class Pending implements Action
    {
        public readonly type = Enum.Pending;
    
        constructor(
            public payload: any
        ) { }
    }
    
    export class Success implements Action
    {
        public readonly type = Enum.Success;
    
        constructor(
            public payload: any
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

export namespace DeleteTodo 
{
    export enum Enum
    {
        Pending = '[DeleteTodo] Pending',
        Success = '[DeleteTodo] Success',
        Error = '[DeleteTodo] Error'
    }

    export class Pending implements Action
    {
        public readonly type = Enum.Pending;

        constructor(
            public payload: any
        ) { }
    }

    export class Success implements Action
    {
        public readonly type = Enum.Success;

        constructor(
            public payload: any
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
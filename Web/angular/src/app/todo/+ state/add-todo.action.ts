import { Action } from '@ngrx/store';

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
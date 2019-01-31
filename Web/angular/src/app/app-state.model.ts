import { TodoState } from './todo/models';

interface State
{
    todos: TodoState
}

export type AppState = Readonly<State>;
import { Todo } from './todo.model';

interface State
{
    error: any;

    offset: number;

    todoList: Todo[];

    todoListTotal: number;

    getTodoPending: boolean;

    addTodoPending: boolean;

    updateTodoPending: boolean;

    deleteTodoPending: boolean;
}

export type TodoState = Readonly<State>;
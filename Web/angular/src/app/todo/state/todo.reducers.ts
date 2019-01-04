import { GetTodoActions, GetTodoActionsEnum } from './get-todo.actions';
import { AddTodoActions, AddTodoActionsEnum } from './add-todo.action';
import { DelTodoActions, DelTodoActionsEnum } from './del-todo.action';

// TODO: Find a place to put this
interface ITodoState
{
    error: any;

    todoList: any[];

    getTodoPending: boolean;

    addTodoPending: boolean;

    delTodoPending: boolean;
}

const initialState: ITodoState = {
    error: null,
    todoList: [],
    getTodoPending: false,
    addTodoPending: false,
    delTodoPending: false
};

export const todoReducers = (state = initialState, action: GetTodoActions | AddTodoActions | DelTodoActions): ITodoState =>
{
    switch (action.type) {
        case GetTodoActionsEnum.Pending:
            return {
                ...state,
                error: null,
                getTodoPending: true
            };

        case GetTodoActionsEnum.Success:
            return {
                ...state,
                todoList: action.payload,
                getTodoPending: false
            };

        case GetTodoActionsEnum.Error:
            return {
                ...state,
                error: action.payload,
                getTodoPending: false
            };

        case AddTodoActionsEnum.Pending:
            return {
                ...state,
                error: null,
                addTodoPending: true
            };

        case AddTodoActionsEnum.Success:
            return {
                ...state,
                // todoList: state.todoList, //State management, make the api return the created result
                addTodoPending: false
            };

        case AddTodoActionsEnum.Error:
            return {
                ...state,
                error: action.payload,
                addTodoPending: false
            };

        case DelTodoActionsEnum.Pending:
            return {
                ...state,
                error: null,
                delTodoPending: true
            };

        case DelTodoActionsEnum.Success:
            return {
                ...state,
                // todoList: state.todoList, //State management, remove the todo based on the id sent in the payload? ??
                delTodoPending: false
            };

        case DelTodoActionsEnum.Error:
            return {
                ...state,
                error: action.payload,
                delTodoPending: false
            };

        default:
            return state;
    }
}
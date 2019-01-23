import { TodoState } from '../models';

import { GetTodo, AddTodo, UpdateTodo, DeleteTodo } from './todo.action';

const initialState: TodoState = {
    error: null,
    offset: 0,
    limit: 25,
    todoList: [],
    todoListTotal: 0,
    getTodoPending: false,
    addTodoPending: false,
    updateTodoPending: false,
    deleteTodoPending: false
};

export const todoReducers = (state = initialState, action: GetTodo.Types | AddTodo.Types | UpdateTodo.Types | DeleteTodo.Types): TodoState =>
{
    switch (action.type) {
        case GetTodo.Enum.Pending:
            return {
                ...state,
                error: null,
                offset: action.payload.offset,
                getTodoPending: true
            };

        case GetTodo.Enum.Success:
            return {
                ...state,
                todoList: state.offset ? [...state.todoList, ...action.payload.items] : action.payload.items,
                todoListTotal: action.payload.total,
                getTodoPending: false
            };

        case GetTodo.Enum.Error:
            return {
                ...state,
                error: action.payload,
                getTodoPending: false
            };

        case AddTodo.Enum.Pending:
            return {
                ...state,
                error: null,
                addTodoPending: true
            };

        case AddTodo.Enum.Success:
            return {
                ...state,
                todoList: [action.payload, ...state.todoList],
                todoListTotal: state.todoListTotal + 1,
                addTodoPending: false
            };

        case AddTodo.Enum.Error:
            return {
                ...state,
                error: action.payload,
                addTodoPending: false
            };

        case UpdateTodo.Enum.Pending:
            return {
                ...state,
                error: null,
                updateTodoPending: true
            };

        case UpdateTodo.Enum.Success:
            return {
                ...state,
                todoList: [...state.todoList.map(todo => (todo.id === action.payload.id) ? { ...todo, ...action.payload.todo } : todo)],
                updateTodoPending: false
            };

        case UpdateTodo.Enum.Error:
            return {
                ...state,
                error: action.payload,
                updateTodoPending: false
            };

        case DeleteTodo.Enum.Pending:
            return {
                ...state,
                error: null,
                deleteTodoPending: true
            };

        case DeleteTodo.Enum.Success:
            return {
                ...state,
                todoList: [...state.todoList.filter(todo => todo.id != action.payload)],
                todoListTotal: state.todoListTotal - 1,
                deleteTodoPending: false
            };

        case DeleteTodo.Enum.Error:
            return {
                ...state,
                error: action.payload,
                deleteTodoPending: false
            };

        default:
            return state;
    }
}
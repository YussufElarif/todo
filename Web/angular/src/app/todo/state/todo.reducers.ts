import { FilterTodoActions, FilterTodoActionsEnum } from './filter-todo.action';
import { GetTodoActions, GetTodoActionsEnum } from './get-todo.actions';
import { AddTodoActions, AddTodoActionsEnum } from './add-todo.action';
import { DelTodoActions, DelTodoActionsEnum } from './del-todo.action';

// TODO: Find a place to put this
interface ITodoState
{
    error: any;

    todoList: any[];

    todoListTotal: number;

    getTodoPending: boolean;

    addTodoPending: boolean;

    delTodoPending: boolean;

    filterTodoPending: boolean;
}

const initialState: ITodoState = {
    error: null,
    todoList: [],
    todoListTotal: 0,
    getTodoPending: false,
    addTodoPending: false,
    delTodoPending: false,
    filterTodoPending: false,
};

export const todoReducers = (state = initialState, action: GetTodoActions | AddTodoActions | DelTodoActions | FilterTodoActions): ITodoState =>
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
                todoList: [...state.todoList, ...action.payload.items],
                todoListTotal: action.payload.total,
                getTodoPending: false
            };

        case GetTodoActionsEnum.Error:
            return {
                ...state,
                error: action.payload,
                getTodoPending: false
            };

        case FilterTodoActionsEnum.Pending:
            return {
                ...state,
                error: null,
                filterTodoPending: true
            };

        case FilterTodoActionsEnum.Success:
            return {
                ...state,
                todoList: action.payload.items,
                todoListTotal: action.payload.total,
                filterTodoPending: false
            };

        case FilterTodoActionsEnum.Error:
            return {
                ...state,
                error: action.payload,
                filterTodoPending: false
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
                todoList: [...state.todoList, action.payload],
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
                todoList: [...state.todoList.filter(todo => todo.id != action.payload)],
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
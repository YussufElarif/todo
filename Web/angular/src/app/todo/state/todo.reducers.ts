import { AddTodo } from './add-todo.action';
import { GetTodo } from './get-todo.action';
import { DeleteTodo } from './delete-todo.action';
import { FilterTodo } from './filter-todo.action';
import { UpdateTodo } from './update-todo.action';

// TODO: Find a place to put this
interface ITodoState
{
    error: any;

    todoList: any[];

    todoListTotal: number;

    getTodoPending: boolean;

    addTodoPending: boolean;

    updateTodoPending: boolean;

    deleteTodoPending: boolean;

    filterTodoPending: boolean;
}

const initialState: ITodoState = {
    error: null,
    todoList: [],
    todoListTotal: 0,
    getTodoPending: false,
    addTodoPending: false,
    updateTodoPending: false,
    deleteTodoPending: false,
    filterTodoPending: false,
};

export const todoReducers = (state = initialState, action: GetTodo.Types | AddTodo.Types | UpdateTodo.Types | DeleteTodo.Types | FilterTodo.Types): ITodoState =>
{
    switch (action.type) {
        case GetTodo.Enum.Pending:
            return {
                ...state,
                error: null,
                getTodoPending: true
            };

        case GetTodo.Enum.Success:
            return {
                ...state,
                todoList: [...state.todoList, ...action.payload.items],
                todoListTotal: action.payload.total,
                getTodoPending: false
            };

        case GetTodo.Enum.Error:
            return {
                ...state,
                error: action.payload,
                getTodoPending: false
            };

        case FilterTodo.Enum.Pending:
            return {
                ...state,
                error: null,
                filterTodoPending: true
            };

        case FilterTodo.Enum.Success:
            return {
                ...state,
                todoList: action.payload.items,
                todoListTotal: action.payload.total,
                filterTodoPending: false
            };

        case FilterTodo.Enum.Error:
            return {
                ...state,
                error: action.payload,
                filterTodoPending: false
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
                todoList: [...state.todoList, action.payload],
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
                todoList: [...state.todoList.map(todo => (todo.id === action.payload.id) ? { ...todo, ...action.payload.todo } : todo )],
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
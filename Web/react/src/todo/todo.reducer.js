import {
    GET_TODO_LIST,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO
} from './todo.types';

export const initialState = {
    error: '',
    todoList: [],
    todoListTotal: 0,
    isGetTodoListPending: false,
    isAddTodoPending: false,
    isUpdateTodoPending: false,
    isDeleteTodoPending: false
};

export const todoReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_TODO_LIST.PENDING:
            return {
                ...state,
                isGetTodoListPending: true
            };
        case GET_TODO_LIST.SUCCESS:
            return {
                ...state,
                todoList: action.payload.items,
                todoListTotal: action.payload.total,
                isGetTodoListPending: false
            };
        case GET_TODO_LIST.ERROR:
            return {
                ...state,
                getListError: action.payload,
                isGetTodoListPending: false
            };
        case ADD_TODO.PENDING:
            return {
                ...state,
                isAddTodoPending: true
            };
        case ADD_TODO.SUCCESS:
            return {
                ...state,
                isAddTodoPending: false
            };
        case ADD_TODO.ERROR:
            return {
                ...state,
                addError: action.payload,
                isAddTodoPending: false
            };
        case UPDATE_TODO.PENDING:
            return {
                ...state,
                isUpdateTodoPending: true
            };
        case UPDATE_TODO.SUCCESS:
            return {
                ...state,
                isUpdateTodoPending: false
            };
        case UPDATE_TODO.ERROR:
            return {
                ...state,
                updateError: action.payload,
                isUpdateTodoPending: false
            };
        case DELETE_TODO.PENDING:
            return {
                ...state,
                isDeleteTodoPending: true
            };
        case DELETE_TODO.SUCCESS:
            return {
                ...state,
                isDeleteTodoPending: false
            };
        case DELETE_TODO.ERROR:
            return {
                ...state,
                deleteError: action.payload,
                isDeleteTodoPending: false
            };
        default:
            return state;
    }
}
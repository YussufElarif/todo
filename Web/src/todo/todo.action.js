import {
    GET_TODO_LIST,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO
} from './todo.types';

import {  
    get,
    post,
    put,
    del
} from '../helpers/http.helper';

export const getTodoList = () => {
    return (dispatch) => {
        dispatch({ type: GET_TODO_LIST.PENDING });

        get('/todo')
            .then((res) => {
                dispatch({ type: GET_TODO_LIST.SUCCESS, payload: res });
            })
            .catch((err) => {
                console.error(err);
                dispatch({ type: GET_TODO_LIST.ERROR, payload: err });
            });
    }
}

export const addTodo = (todo) => {
    return (dispatch) => {
        dispatch({ type: ADD_TODO.PENDING });

        post('/todo', todo)
            .then(() => {
                dispatch({ type: ADD_TODO.SUCCESS });
            })
            .catch((err) => {
                console.error(err);
                dispatch({ type: ADD_TODO.ERROR, payload: err });
            });
    }
}

export const updateTodo = (id, todo) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_TODO.PENDING });

        put(`/todo/${id}`, todo)
            .then(() => {
                dispatch({ type: UPDATE_TODO.SUCCESS });
            })
            .catch((err) => {
                console.error(err);
                dispatch({ type: UPDATE_TODO.ERROR, payload: err });
            });
    }
}

export const deleteTodo = (id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_TODO.PENDING });

        del(`/todo/${id}`)
            .then(() => {
                dispatch({ type: DELETE_TODO.SUCCESS });
            })
            .catch((err) => {
                console.error(err);
                dispatch({ type: DELETE_TODO.ERROR, payload: err });
            });
    }
}
import { TodoListComponent } from './todo-list.component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    getTodoList,
    addTodo,
    updateTodo,
    deleteTodo
} from '../todo.action';

const mapStateToProps = (state) => ({
    error: state.todoReducer.error,
    todoList: state.todoReducer.todoList,
    isGetTodoListPending: state.todoReducer.isGetTodoListPending,
    isAddTodoPending: state.todoReducer.isAddTodoPending,
    isUpdateTodoPending: state.todoReducer.isUpdateTodoPending,
    isDeleteTodoPending: state.todoReducer.isDeleteTodoPending
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getTodoList,
    addTodo,
    updateTodo,
    deleteTodo
}, dispatch);

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);
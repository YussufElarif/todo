import React, { Component } from 'react';
import { TodoComponent } from './todo.component';

import './todo-list.css';

export class TodoListView extends Component {

    componentWillMount = () => {
        this.props.getTodoList();
    }

    componentWillReceiveProps = (props) => {
        const addSucceeded = !props.isAddTodoPending && this.props.isAddTodoPending && !props.error;
        const updateTodo = !props.isUpdateTodoPending && this.props.isUpdateTodoPending && !props.error;
        const deleteTodo = !props.isDeleteTodoPending && this.props.isDeleteTodoPending && !props.error;
        
        if (addSucceeded || updateTodo || deleteTodo) {
            this.props.getTodoList();
        }
    }

    handleAddTodo = (value) => {
        this.props.addTodo({ value });
    }

    handleDeleteTodo = (id) => {
        this.props.deleteTodo(id);
    }

    handleUpdateTodo = (id, todo) => {
        this.props.updateTodo(id, todo);
    }

    render = () => {
        const { todoList } = this.props;

        return (
            <div className="todolist">
                <ul>
                    {
                        todoList.map(todo => (
                            <li key={todo.id}>
                                <TodoComponent todo={todo}
                                               onUpdate={this.handleUpdateTodo}
                                               onDelete={this.handleDeleteTodo} />
                            </li>
                        ))
                    }
                </ul>

                <TodoComponent onAdd={this.handleAddTodo} />
            </div>
        )
    }
}
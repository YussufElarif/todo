import React, { Component } from 'react';

export class TodoListView extends Component {
    constructor() {
        super();

        this.state = {
            id: null,
            value: '',
            isComplete: false
        }
    }

    componentDidMount = () => {
        const { todo } = this.props;

        if (!todo) {
            return;
        }

        this.setState({ ...todo });
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({ value });
    }

    handleAdd = () => {
        const { onAdd } = this.props;

        if (!onAdd) {
            return;
        }

        onAdd(this.state.value);
        this.setState({ value: '' });
    }

    handleUpdate = () => {
        const { todo, onUpdate } = this.props;
        const { id, value, isComplete } = this.state;        

        if (!onUpdate) {
            return;
        }

        let todoItem = {};

        if (todo.value !== value) {
            todoItem.value = value;
        }

        if (todo.isComplete !== isComplete) {
            todoItem.isComplete = isComplete;
        }

        onUpdate(id, todoItem);
    }

    handleDelete = () => {
        const { onDelete } = this.props;
        
        if (!onDelete) {
            return;
        }

        onDelete(this.state.id);
    }

    render = () => {
        const { id, value, isComplete } = this.state;

        return (
            <div className="todo-view-container">
                {
                    id &&
                    <div className="todo-view">
                        <input type="text"
                            value={value}
                            onChange={this.handleChange} />

                        <button className="todo-view-update"
                            onClick={this.handleUpdate}> Update </button>

                        <button className="todo-view-delete"
                            onClick={this.handleDelete}> Delete </button>
                    </div>
                }

                {
                    !id &&
                    <div className="todo-view">
                        <input type="text"
                            value={value}
                            onChange={this.handleChange} />

                        <button className="todo-view-add"
                            onClick={this.handleAdd}> Add </button>
                    </div>
                }
            </div>
        );
    }
}
import React, { Component } from 'react';

export class TodoComponent extends Component {
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

        if (!id) {
            return (
                <div className="row">
                    <div className="input-field col s12">
                        <input id="todo_add"
                               type="text"
                               value={value}
                               onChange={this.handleChange} />
                            
                        <label htmlFor="todo_add">Todo item</label>
                    </div>

                    <a className="btn add waves-effect green accent-4"
                       onClick={this.handleAdd}><i className="material-icons">add</i></a>
                </div>
            );
        }


        return (
            <div className="row">
                <input className="col s12" 
                       type="text"
                       value={value}
                       onChange={this.handleChange} />

                 <a className="btn update waves-effect orange accent-2"
                    title="Temporary update button"
                    onClick={this.handleUpdate}><i className="material-icons">refresh</i></a> 

                <a className="btn delete waves-effect red accent-2"
                    onClick={this.handleDelete}><i className="material-icons">delete</i></a>
            </div>
        );
    }
}
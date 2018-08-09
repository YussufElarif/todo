import React, { Component } from 'react';
import TodoListView from './todo-list.view';

export class TodoListComponent extends Component {
    constructor() {
        super();

        this.state = {
            list: [],
            value: ''
        };
    }

    componentDidMount = () => {

    }

    handleAddTodo = () => {
        console.log(this.state.value);
    }

    handleDeleteTodo = (id) => {
        const item = { id };
        this.setState({ delete: item });
    }

    handleUpdateTodo = (id, value, isComplete) => {
        const item = { id, value, isComplete };
        this.setState({  update: value });
    }

    handleAddInputChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render = () => <TodoListView {...this} />
}
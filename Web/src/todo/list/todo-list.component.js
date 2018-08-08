import { Component } from 'react'
import TodoListView from './todo-list.view';

export class TodoListComponent extends Component, TodoListView {
    constructor() {
        super();
        
        this.state = {
            hi: 1
        };
    }

    componentDidMount() {
        this.setState({ hi: 3 });
    }
} 
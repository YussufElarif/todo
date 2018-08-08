import { TodoListView } from './todo-list.view';

export class TodoListComponent extends TodoListView {
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
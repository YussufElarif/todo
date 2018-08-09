import React from 'react';
import './todo-list.view.css';

export default (self) => (
    <div>
        <div className="todolist">
            {
                self.state.list.map(todo => (
                    <div>
                        <input type="text" value={todo.value} />
                        <button type="button">Delete</button>
                    </div>
                ))
            }
        </div>

        <div className="todolist-add">
            <input type="text" 
                   value={self.state.value}
                   onChange={self.handleAddInputChange} />

            <button onClick={self.handleAddTodo}>Add todo item</button>
        </div>
    </div>
);
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import indexStore from './index.store';

import { TodoList } from './todo';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

ReactDOM.render(
    <Provider store={indexStore}>
        <div className="container">
            <TodoList />
        </div>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

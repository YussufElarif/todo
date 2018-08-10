import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import { TodoList } from './todo';

import registerServiceWorker from './registerServiceWorker';
import indexStore from './index.store';

ReactDOM.render(
    <Provider store={indexStore}>
        <TodoList />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

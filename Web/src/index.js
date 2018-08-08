import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// import View from './View';
import { TodoListComponent as View } from './todo';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<View />, document.getElementById('root'));
registerServiceWorker();

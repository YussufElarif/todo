import React, { Component } from 'react';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            hi: 2
        };
    }

    componentDidMount = () => {
        this.setState({ hi: 3 });
    }
}
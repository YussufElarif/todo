import React from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App';

export default class View extends App {
  render = () => (
    <h1>View { this.state.hi }</h1>
  )
}

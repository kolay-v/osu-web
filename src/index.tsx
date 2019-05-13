import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './game';

ReactDOM.render(<App game={new Game()} />, document.getElementById('root'));

import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import Game from './game';

interface AppProps {
  game: Game;
}

const App: React.SFC<AppProps> = ({ game }) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <Button onClick={game.run}>src/App.tsx</Button> and save to
          reload.
        </p>
      </header>
    </div>
  );
};

export default App;

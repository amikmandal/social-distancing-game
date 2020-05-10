import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas'

function App() {

  // console.log(this.context);

  return (
    <div className="App">
      <header className="App-header">
        <Canvas/>
      </header>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import SideInfos from './components/SideInfos';

function App() {
  return <div className="App">
    <BoardComponent />
    <SideInfos />
  </div>
}

export default App;

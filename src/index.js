import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css';

import Board from './game/Board';

ReactDOM.render(
  <React.StrictMode>
    <main>
      <Board />
    </main>
  </React.StrictMode>,
  document.getElementById("root")
);

import { useState, useEffect } from 'react';
import './App.css';
import Board from './classes/Board';
import Rook from './classes/pieces/Rook';
import Game from './classes/Game';
import Pos from './classes/Pos';

function App() {
  const [board, updateBoard] = useState(new Board(8));

  useEffect(() => {
    const torre1 = new Rook(new Pos(0, 0), true);

    const torre2 = new Rook(new Pos(0, 1), true);

    const board = new Board(8);

    const game = new Game(board);

    game.addPiece(torre1);

    game.addPiece(torre2);

    game.movePiece(torre1, Pos(3, 2));

    torre1.getAvaliableMoves(board);
    torre2.getAvaliableMoves(board);

    console.log(torre1.avaliableMoves, torre2.avaliableMoves);
  }, [])

  return (
    <div className="App">
      {
        board.tiles.map((line, lineIndex) => (
          <div key={lineIndex} className="line">
            {line.map((tile, tileIndex) => (
              <span key={tileIndex} className="tile"/>
            ))}
          </div>
        ))
      }
    </div>
  );
}

export default App;

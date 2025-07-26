import { useState, useEffect, use } from 'react';
import './App.css';
import PieceComponent from './components/PieceComponent';

import game from './iniciateGame';
import Tile from './classes/Tile';
import Piece from './classes/Piece';

function App() {
  const [board, updateBoard] = useState(game.board.tiles);
  const [selectedPiece, updateSelected] = useState<Piece | null>(null);

  const handleTileClick = (tile: Tile) => {
    if (selectedPiece) {
      game.movePiece(selectedPiece, tile.position);
      updateSelected(null);
      updateBoard([...game.board.tiles]);

      return;
    }

    updateSelected(tile.occupiedBy);
  };

  return (
    <div className="App">
      {
        board.map((line, lineIndex) => (
          <div key={lineIndex} className="line">
            {line.map((tile, tileIndex) => (
              <div
                key={tileIndex}
                className="tile"
                onClick={() => handleTileClick(tile)}
              >
                {
                  tile.occupiedBy ? 
                  <PieceComponent
                    piece={ tile.occupiedBy }
                    tile={ tile }
                    selectedPiece={ selectedPiece }
                    updateSelected={ updateSelected }
                  /> : "."
                }
              </div>
            ))}
          </div>
        ))
      }
    </div>
  );
}

export default App;

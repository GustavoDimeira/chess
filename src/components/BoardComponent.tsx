import { useState, useEffect } from 'react';
import PieceComponent from '../components/PieceComponent';

import game from '../iniciateGame';
import Tile from '../classes/Tile';
import Piece from '../classes/Piece';

const TILE_SIZE = 80; // Define this as a constant for easy access

export default () => {
    const [board, updateBoard] = useState(game.board.tiles);
    const [selectedPiece, updateSelected] = useState<Piece | null>(null);

    useEffect(() => {
        game.board.tiles.forEach(line => line.forEach(tile => tile.highLighted = false));

        selectedPiece?.avaliableMoves.forEach(tile => tile.highLighted = true);

        updateBoard([...game.board.tiles]);
    }, [selectedPiece]);

    const handleTileClick = (tile: Tile) => {
        if (selectedPiece) {
            const hasMoved = game.movePiece(selectedPiece, tile.position);

            if (hasMoved) {
                updateSelected(null);
            } else if (tile.occupiedBy) {
                updateSelected(tile.occupiedBy);
            } else {
                updateSelected(null);
            }

            updateBoard([...game.board.tiles]);

            return;
        }

        if (tile.occupiedBy) {
            updateSelected(tile.occupiedBy);
        }
    };

    return (
        <div className="board-wrapper">
            <div className="board-container">
                {board.flat().map((tile, index) => {
                    const tileColorClass = (Math.floor(index / 8) + index % 8) % 2 === 0 ? 'light' : 'dark';
                    const isCapture = tile.highLighted && tile.occupiedBy;
                    return (
                        <div
                            key={index}
                            className={`tile ${tileColorClass} ${isCapture ? 'capture-highlight' : ''}`}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => handleTileClick(tile)}
                            onClick={() => handleTileClick(tile)}
                        >
                            {tile.highLighted && !tile.occupiedBy && <div className="highlight-dot"></div>}
                        </div>
                    );
                })}
            </div>
            <div className="piece-container">
                {game.board.pieceList.map(piece => (
                    <div
                        key={piece.ID}
                        className="piece-wrapper"
                        style={{
                            transform: `translate(${piece.position.x * TILE_SIZE}px, ${piece.position.y * TILE_SIZE}px)`,
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onClick={() => handleTileClick(game.board.getTile(piece))}
                        onDrop={() => handleTileClick(game.board.getTile(piece))}
                    >
                        <PieceComponent
                            piece={piece}
                            updateSelected={updateSelected}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
import { useState, useEffect, use } from 'react';
import PieceComponent from '../components/PieceComponent';

import game from '../iniciateGame';
import Tile from '../classes/Tile';
import Piece from '../classes/Piece';

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
            } else {
                updateSelected(tile.occupiedBy);
            }

            updateBoard([...game.board.tiles]);

            return;
        }

        updateSelected(tile.occupiedBy);
    };

    return (
        <div>
            {
                board.map((line, lineIndex) => (
                    <div key={lineIndex} className="line">
                        {line.map((tile, tileIndex) => (
                            <div
                                key={tileIndex}
                                className={`tile ${tile.highLighted ? "highLighted" : ""}`}
                                onClick={() => handleTileClick(tile)}
                                onDragOver={(event) => {
                                    event.preventDefault();
                                }}
                                onDrop={() => {
                                    handleTileClick(tile);
                                }}
                            >
                                {
                                    tile.occupiedBy ?
                                        <PieceComponent
                                            piece={tile.occupiedBy}
                                            updateSelected={updateSelected}
                                        /> : `${tile.position.y} - ${tile.position.x}`
                                }
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    );
}
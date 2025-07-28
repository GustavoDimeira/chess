import { useState, useEffect } from 'react';
import PieceComponent from '../components/PieceComponent';

import game from '../iniciateGame';
import Tile from '../classes/Tile';
import Piece from '../classes/Piece';

type BoardComponentProps = {
    tileSize: number;
};

export default ({ tileSize }: BoardComponentProps) => {
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
        <div className="board-wrapper" style={{ width: tileSize * 8, height: tileSize * 8 }}>
            <div className="board-container" style={{
                gridTemplateColumns: `repeat(8, ${tileSize}px)`,
                gridTemplateRows: `repeat(8, ${tileSize}px)`,
            }}>
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
                            style={{ width: tileSize, height: tileSize }}
                        >
                            {tile.highLighted && !tile.occupiedBy && <div className="highlight-dot" style={{ width: tileSize * 0.25, height: tileSize * 0.25 }}></div>}
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
                            transform: `translate(${piece.position.x * tileSize}px, ${piece.position.y * tileSize}px)`,
                            width: tileSize,
                            height: tileSize,
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onClick={() => handleTileClick(game.board.getTile(piece))}
                        onDrop={() => handleTileClick(game.board.getTile(piece))}
                    >
                        <PieceComponent
                            piece={piece}
                            updateSelected={updateSelected}
                            tileSize={tileSize}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import PieceComponent from '../components/PieceComponent';
import GameStatusPopup from './GameStatusPopup';
import PromotionPopUp from './PromotionPopUp';

import game from '../iniciateGame';
import Tile from '../classes/Tile';
import Piece from '../classes/Piece';
import { GameState } from '../classes/Game'; 

type BoardComponentProps = {
    tileSize: number;
    updateHistory: Dispatch<SetStateAction<string[]>>
};

export default ({ tileSize, updateHistory }: BoardComponentProps) => {
    const [board, updateBoard] = useState(game.board.tiles);
    const [selectedPiece, updateSelected] = useState<Piece | null>(null);
    // Adicionar estado para o gameState para forçar a re-renderização
    const [gameState, setGameState] = useState<GameState>(game.gameState);

    useEffect(() => {
        const timer = setInterval(() => {
            if (game.gameState !== gameState) {
                setGameState(game.gameState);
            }
        }, 200); // Check for game state changes periodically

        return () => clearInterval(timer);
    }, [gameState]);

    useEffect(() => {
        game.board.tiles.forEach(line => line.forEach(tile => tile.highLighted = false));

        if (selectedPiece?.color === game.turn) {
            selectedPiece?.avaliableMoves.forEach(tile => tile.highLighted = true);
        }

        updateBoard([...game.board.tiles]);
    }, [selectedPiece, game.turn]);

    const handleTileClick = (tile: Tile) => {
        if (gameState !== GameState.running) return; // Bloquear cliques se o jogo acabou

        if (selectedPiece) {
            const hasMoved = game.movePiece(selectedPiece, tile.position);

            if (typeof hasMoved == "string") {
                updateSelected(null);
                setGameState(game.gameState); // Atualizar o estado do jogo

                updateHistory((prev) => [...prev, hasMoved]);
            } else {
                // Se o clique não foi um movimento válido, 
                // atualiza a seleção para a peça no tile clicado (se houver)
                if (tile.occupiedBy && tile.occupiedBy.color === game.turn) {
                    updateSelected(tile.occupiedBy);
                } else {
                    updateSelected(null);
                }
            }

            updateBoard([...game.board.tiles]);

            return;
        }

        if (tile.occupiedBy && tile.occupiedBy.color === game.turn) {
            updateSelected(tile.occupiedBy);
        }
    };

    const handleResetGame = () => {
        window.location.reload(); // A forma mais simples de reiniciar com a estrutura atual
    };

    return (
        <div className="board-wrapper" style={{ width: tileSize * 8, height: tileSize * 8 }}>
            {gameState !== GameState.running && (
                <GameStatusPopup
                    gameState={gameState}
                    winner={game.winner}
                    endReason={game.gameEndReason}
                    onReset={handleResetGame}
                />
            )}
            {game.promoting ? (
                <PromotionPopUp
                    tileSize={tileSize * 1.5}
                    color={!game.turn}
                />
            ) : (
            <div className="board-container" style={{
                gridTemplateColumns: `repeat(8, ${tileSize}px)`,
                gridTemplateRows: `repeat(8, ${tileSize}px)`,
            }}>
                {(game.playerColor
                    ? board.flat()
                    : board.slice().reverse().flatMap(row => row.slice().reverse())
                ).map((tile, index) => {
                    const tileColorClass =
                        (Math.floor(index / 8) + index % 8) % 2 === 0 ? 'light' : 'dark';
                    const isCapture = tile.highLighted && tile.occupiedBy;
                    return (
                        <div
                            key={index}
                            className={`tile ${tileColorClass} ${isCapture ? 'capture-highlight' : ''}`}
                            onDragOver={(event) => {
                                event.preventDefault();
                            }}
                            onDrop={() => handleTileClick(tile)}
                            onClick={() => handleTileClick(tile)}
                            style={{ width: tileSize, height: tileSize }}
                        >
                            {tile.highLighted && !tile.occupiedBy && (
                                <div
                                    className="highlight-dot"
                                    style={{
                                        width: tileSize * 0.25,
                                        height: tileSize * 0.25,
                                    }}
                                ></div>
                            )}
                        </div>
                    );
                })}

            </div>)}
            <div className="piece-container">
                {game.board.pieceList.map(piece => (
                    <div
                        key={piece.ID}
                        className="piece-wrapper"
                        style={{
                            transform: `translate(${(game.playerColor === false ? 7 - piece.position.x : piece.position.x) * tileSize
                                }px, ${(game.playerColor === false ? 7 - piece.position.y : piece.position.y) * tileSize
                                }px)`,
                            width: tileSize,
                            height: tileSize,
                            pointerEvents: gameState !== GameState.running ? 'none' : 'auto',
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
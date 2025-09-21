import { useEffect, useState } from "react";
import Board from "../classes/Board"
import Queen from "../classes/pieces/Queen";
import Pos from "../classes/Pos";
import Rook from "../classes/pieces/Rook";
import Knight from "../classes/pieces/Knight";
import Bishop from "../classes/pieces/Bishop";
import Game from "../classes/Game";
import PieceComponent from "./PieceComponent";
import Tile from "../classes/Tile";

type promotionPopUpProp = {
    color: boolean,
    tileSize: number
}

const board = new Board(4, 1);

const queen = new Queen(new Pos(0, 0), true);
const rook = new Rook(new Pos(1, 0), true);
const knight = new Knight(new Pos(2, 0), true);
const bishop = new Bishop(new Pos(3, 0), true);

const game_a = new Game(board, [0, 0], true);

game_a.addPiece(queen);
game_a.addPiece(rook);
game_a.addPiece(knight);
game_a.addPiece(bishop);

export default ({ color, tileSize }: promotionPopUpProp) => {
    const [board, updateBoard] = useState<Tile[][]>(game_a.board.tiles);
    const [game, updateGame] = useState<Game>(game_a);

    return (
        <div
            id="promotion-popup"
        >
            <div className="board-container" style={{
                gridTemplateColumns: `repeat(8, ${tileSize}px)`,
                gridTemplateRows: `repeat(8, ${tileSize}px)`,
            }}>
                {
                    board.map((line, line_i) => {
                        return (
                            <div key={line_i}>
                                {line.map((tile, index) => {
                                    const tileColorClass =
                                        (index % 2 === 0) ? 'light' : 'dark';
                                    return (
                                        <div
                                            key={index}
                                            className={`tile ${tileColorClass}`}
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
                            </div>
                        )
                    })

                }

            </div>
            <div className="piece-container">
                {game.board.pieceList.map(piece => (
                    <div
                        key={piece.ID}
                        className="piece-wrapper"
                        style={{
                            transform: `translate(${(game.playerColor === false ? 4 - piece.position.y : piece.position.y) * tileSize
                                }px, ${(game.playerColor === false ? 4 - piece.position.x : piece.position.x) * tileSize
                                }px)`,
                            width: tileSize,
                            height: tileSize,
                        }}
                    >
                        <PieceComponent
                            piece={piece}
                            tileSize={tileSize}
                            updateSelected={null}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}
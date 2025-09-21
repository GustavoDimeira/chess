import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Board from "../classes/Board"
import Queen from "../classes/pieces/Queen";
import Pos from "../classes/Pos";
import Rook from "../classes/pieces/Rook";
import Knight from "../classes/pieces/Knight";
import Bishop from "../classes/pieces/Bishop";
import Game, { PieceClass } from "../classes/Game";
import PieceComponent from "./PieceComponent";
import Tile from "../classes/Tile";
import "./PromotionPopUp.css";
import Piece from "../classes/Piece";

type promotionPopUpProp = {
    color: boolean,
    tileSize: number
    game: Game,
    updatePromoting: Dispatch<SetStateAction<Piece | null>>
}

const initial_board = new Board(1, 4);

export default ({ color, tileSize, game, updatePromoting }: promotionPopUpProp) => {
    const [board, updateBoard] = useState<Tile[][]>(initial_board.tiles);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [pieceClasses, setPieceClasses] = useState<PieceClass[]>([]);

    useEffect(() => {
        const board = new Board(1, 4);
        const pieceClasses = [Queen, Rook, Knight, Bishop];
        const pieces = [
            new Queen(new Pos(0, 0), color),
            new Rook(new Pos(0, 1), color),
            new Knight(new Pos(0, 2), color),
            new Bishop(new Pos(0, 3), color)
        ];

        pieces.forEach(p => board.getTile(p).occupiedBy = p);

        updateBoard(board.tiles);
        setPieces(pieces);
        setPieceClasses(pieceClasses);
    }, [color]);

    const handlePromote = (index: number) => {
        game.promote(pieceClasses[index]);
        updatePromoting(null);
    }

    return (
        <div
            id="promotion-popup"
        >
            <div className="board-container" style={{
                gridTemplateColumns: `repeat(4, ${tileSize}px)`,
                gridTemplateRows: `repeat(1, ${tileSize}px)`,
            }}>
                {
                    board.map((line, line_i) => {
                        return (
                            <div key={line_i} className="line">
                                {line.map((tile, index) => {
                                    const tileColorClass =
                                        (tile.position.x % 2 === 0) ? 'light' : 'dark';
                                    return (
                                        <div
                                            key={index}
                                            className={`tile ${tileColorClass}`}
                                            style={{ width: tileSize, height: tileSize }}
                                            onClick={() => handlePromote(index)}
                                        />
                                    );
                                })}
                            </div>
                        )
                    })

                }
            </div>
            <div className="piece-container">
                {pieces.map((piece, index) => (
                    <div
                        key={piece.ID}
                        className="piece-wrapper"
                        style={{
                            transform: `translate(${piece.position.x * tileSize}px, ${piece.position.y * tileSize}px)`,
                            width: tileSize,
                            height: tileSize,
                        }}
                        onClick={() => handlePromote(index)}
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
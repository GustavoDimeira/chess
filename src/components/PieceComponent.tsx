import { Dispatch, SetStateAction, useState } from "react";
import Piece from "../classes/Piece";

type PieceProps = {
    piece: Piece;
    updateSelected: Dispatch<SetStateAction<Piece | null>>;
    tileSize: number;
};

export default ({ piece, updateSelected, tileSize }: PieceProps) => {
    const [dragging, updateDragging] = useState(false);

    const handleDragStart = () => {
        updateDragging(true);
        updateSelected(piece);
    }

    const handleDragEnd = () => {
        updateDragging(false);
    }

    return <div
        className={`piece ${piece.color ? 'white-piece' : 'black-piece'} ${dragging ? 'dragging' : ''}`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ fontSize: tileSize * 0.625, lineHeight: `${tileSize}px` }}
    >
        {piece.icon}
    </div>
}
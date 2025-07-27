import { Dispatch, SetStateAction, useState } from "react";
import Piece from "../classes/Piece";

type PieceProps = {
    piece: Piece;
    updateSelected: Dispatch<SetStateAction<Piece | null>>;
};

export default ({ piece, updateSelected }: PieceProps) => {
    const [dragging, updateDragging] = useState(false);

    const handleDragStart = () => {
        updateDragging(true);
        updateSelected(piece);
    }

    const handleDragEnd = () => {
        updateDragging(false);
    }

    return <div
        className={`piece ${dragging ? 'dragging' : ''}`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
    >
        {piece.icon}
    </div>
}
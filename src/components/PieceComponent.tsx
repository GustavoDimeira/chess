import { Dispatch, SetStateAction, useState } from "react";
import Piece from "../classes/Piece";
import Tile from "../classes/Tile";

type PieceProps = {
    piece: Piece;
    updateSelected: Dispatch<SetStateAction<Piece | null>>;
};

export default ({ piece, updateSelected }: PieceProps) => {
    const [dragging, updateDragging] = useState(false);

    const handleDrag = () => {
        updateDragging(true);
        updateSelected(piece);
    }

    const handleDrop = () => {
        updateDragging(false);
        updateSelected(null);
    }

    return <div
        draggable
        onDrag={handleDrag}
        onDragEnd={handleDrop}
    >
        {dragging ? "" : piece.icon}
    </div>
}

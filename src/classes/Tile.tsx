import Piece from "./Piece";
import Pawn from "./pieces/Pawn";
import Pos from "./Pos";

export default class Tile { 
    public occupiedBy: Piece | null = null;
	public attakedBy: Piece[] = [];

    constructor(
        readonly position: Pos
    ) {}

    public attackedByEnemies(color: boolean) {
        return !!this.attakedBy.find(piece => piece.color !== color)
    }
 }
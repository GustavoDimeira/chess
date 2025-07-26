import Piece from "./Piece";
import Pos from "./Pos";

export default class Tile { 
    public occupiedBy: Piece | null = null;
	public attakedBy: Piece[] = [];
    public highLighted: boolean = false;

    constructor(
        readonly position: Pos,
    ) {}

    public attackedByEnemies(color: boolean): Piece[] {
        return this.attakedBy.filter(piece => piece.color !== color);
    }
 }

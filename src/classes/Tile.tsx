import Piece from "./Piece";
import Pos from "./Pos";

export default class Tile { 
    public occupiedBy: Piece | null = null;
	public attakedBy: Piece[] = [];
    public highLighted: boolean = false;

    constructor(
        readonly position: Pos,
    ) {}

    public attackedByEnemies(color: boolean) {
        return !!this.attakedBy.find(piece => piece.color !== color);
    }
 }

import Piece from "./Piece";
import Pos from "./Pos";

export default class Tile {
    public ocupatedBy: Piece | null = null;
	public attakedBy: Piece[] = [];
	// public sightBy: Pawn[] = [];

    constructor(
        readonly position: Pos
    ) {}
 }
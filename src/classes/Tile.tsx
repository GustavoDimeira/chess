import Piece from "./Piece";

export default class Tile {
    public ocupatedBy: Piece | null = null;
	public attakedBy: Piece[] = [];
	// public sightBy: Pawn[] = [];

    constructor() {}
 }
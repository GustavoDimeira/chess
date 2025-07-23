export default class Pos {
    constructor(
        readonly y: number,
        readonly x: number
    ) {}

    public equals(other: Pos): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

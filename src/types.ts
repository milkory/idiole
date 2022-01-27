export class Tile {
  constructor(public character: string = '', public state: TileState = TileState.Empty) {}

  static newLine(): Array<Tile> {
    return Array.from({ length: 4 }, () => new Tile());
  }
}

export const enum TileState {
  Exact = 'exact',
  Almost = 'almost',
  Present = 'present',
  Absent = 'absent',
  Empty = 'empty',
}

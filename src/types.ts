import idioms from './idioms';

export class Tile {
  constructor(
    public character = '',
    public pinyin = '',
    public state = TileState.Empty,
    public highlightPinyin = false
  ) {}

  isFilled() {
    return this.character != '';
  }

  static newLine(): Tile[] {
    return Array.from({ length: 4 }, () => new Tile());
  }

  static fromGuess(guess: string, answer: Idiom) {
    const list = new Array<Tile>();
    const guessIdiom = idioms.get(guess);
    if (!guessIdiom) return null;

    const splitGuess = guess.split('');
    const splitAnswer = answer.idiom.split('');
    const splitGuessPinyin = idioms.removePinyinTone(guessIdiom.pinyin).split(' ');
    const splitAnswerPinyin = idioms.removePinyinTone(answer.pinyin).split(' ');
    const splitGuessPinyinWithTone = guessIdiom.pinyin.split(' ');
    const splitAnswerPinyinWithTone = answer.pinyin.split(' ');

    for (let i = 0; i <= 3; i++) {
      const _guess = splitGuess[i];
      let state = TileState.Absent;
      if (_guess == splitAnswer[i]) {
        state = TileState.Exact;
      } else {
        if (splitGuessPinyin[i] == splitAnswerPinyin[i]) {
          state = TileState.Almost;
        } else {
          for (let j = 0; j <= 3; j++) {
            if (splitGuessPinyin[j] != splitAnswerPinyin[j]) {
              if (splitGuessPinyin[i] == splitAnswerPinyin[j]) {
                state = TileState.Present;
                break;
              }
            }
          }
        }
      }
      if (state == TileState.Absent) {
        if (idioms.getPinyinTone(splitGuessPinyinWithTone[i]) == idioms.getPinyinTone(splitAnswerPinyinWithTone[i])) {
          state = TileState.Little;
        }
      }
      list.push(new Tile(_guess, splitGuessPinyinWithTone[i], state));
    }
    return list;
  }

  static fromGuesses(guess: string[], answer: Idiom) {
    return guess.map(it => this.fromGuess(it, answer)).filter(it => it) as Tile[][];
  }

  static fromTiles(tiles: Tile[], answer: Idiom) {
    return this.fromGuess(this.toString(tiles), answer);
  }

  static transfromTiles(tiles: Tile[], answer: Idiom) {
    let result = this.fromTiles(tiles, answer);
    if (!result) return false;
    for (let i in tiles) {
      tiles[i] = result[i];
    }
    return true;
  }

  static rubyTiles(tiles: Tile[]) {
    let idiom = idioms.get(this.toString(tiles));
    if (!idiom) return false;
    let splitPinyin = idiom.pinyin.split(' ');
    for (let i in tiles) {
      tiles[i].pinyin = splitPinyin[i];
    }
    return true;
  }

  static toString(tiles: Tile[]) {
    return tiles.map(it => it.character).join('');
  }
}

export const enum TileState {
  Exact = 'exact',
  Almost = 'almost',
  Present = 'present',
  Absent = 'absent',
  Little = 'little',
  Empty = 'empty',
}

export class Idiom {
  constructor(readonly idiom: string, readonly pinyin: string, readonly date = 0) {}
}

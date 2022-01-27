import pinyin, { STYLE_NORMAL } from 'pinyin';

export class Tile {
  constructor(public character: string = '', public state: TileState = TileState.Empty) {}

  isFilled() {
    return this.character != '';
  }

  static newLine(): Array<Tile> {
    return Array.from({ length: 4 }, () => new Tile());
  }

  static fromGuess(guess: string, answer: Idiom): Array<Tile> {
    const list = new Array<Tile>();
    const splitGuess = guess.split('');
    const splitAnswer = answer.idiom.split('');
    const splitGuessPinyin = pinyin(guess, { heteronym: true, style: STYLE_NORMAL }); // [][]
    const splitAnswerPinyin = removePinyinTone(answer.pinyin).split(' '); // []

    for (let i = 0; i <= 3; i++) {
      const _guess = splitGuess[i];
      let state = TileState.Absent;
      if (_guess == splitAnswer[i]) {
        state = TileState.Exact;
      } else {
        if (isPinyinSimilar(splitGuessPinyin[i], splitAnswerPinyin[i])) {
          state = TileState.Almost;
        } else {
          for (let j = 0; j <= 3; j++) {
            const _answer = splitAnswer[j];
            if (!isPinyinSimilar(splitGuessPinyin[j], splitAnswerPinyin[j])) {
              if (isPinyinSimilar(splitGuessPinyin[i], splitAnswerPinyin[j])) {
                state = TileState.Present;
              }
            }
          }
        }
      }
      list.push(new Tile(_guess, state));
    }
    return list;
  }
}

function isPinyinSimilar(guess: string[], answer: string) {
  return guess.includes(answer);
}

function removePinyinTone(pinyin: string): string {
  return pinyin
    .replace(/[āáǎà]/g, 'a')
    .replace(/[ēéěè]/g, 'e')
    .replace(/[ōóòò]/g, 'o')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[üǘǚǜ]/g, 'v');
}

export const enum TileState {
  Exact = 'exact',
  Almost = 'almost',
  Present = 'present',
  Absent = 'absent',
  Empty = 'empty',
}

export class Idiom {
  constructor(readonly idiom: string, readonly pinyin: string) {}
}

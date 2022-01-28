import { Idiom } from './types';
import idiomToPinyinData from './data/WordPinyinPairs.json';

const idiomToPinyinMap = Object.entries(idiomToPinyinData);

function today(): Idiom {
  const date = new Date(Date.now()).setHours(0, 0, 0, 0);
  const index = Math.ceil(mulberry32(date) * idiomToPinyinMap.length);
  const entry = idiomToPinyinMap[index];
  return new Idiom(entry[0], entry[1], date);
}

function get(idiom: string) {
  let result = idiomToPinyinMap.find(it => it[0] == idiom);
  return result && new Idiom(result[0], result[1]);
}

function mulberry32(seed: number): number {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
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

function isPinyinSimilar(a: string, b: string) {
  return removePinyinTone(a) == removePinyinTone(b);
}

export default {
  today, get, removePinyinTone, isPinyinSimilar
};

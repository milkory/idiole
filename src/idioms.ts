import { Idiom } from './types';
import idiomToPinyinData from './data/WordPinyinPairs.json'

const idiomToPinyinMap = Object.entries(idiomToPinyinData);

function today(): Idiom {
  const date = new Date(Date.now());
  const seed = date.setHours(0, 0, 0, 0);
  const index = Math.ceil(mulberry32(seed) * idiomToPinyinMap.length);
  const entry = idiomToPinyinMap[index];
  return new Idiom(entry[0], entry[1]);
}

function mulberry32(seed: number): number {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export default {
  today,
};

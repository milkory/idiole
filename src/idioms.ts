import { Idiom } from './types';
import idiomEasyData from './data/idiole_easy.json';
import idiomAdditionData from './data/idiole_addition.json';

const idiomEasyMap = Object.entries(idiomEasyData);
const idiomAddtionMap = Object.entries(idiomAdditionData);

function today(): Idiom {
  const date = new Date(Date.now()).setHours(0, 0, 0, 0);
  const index = Math.ceil(mulberry32(date) * idiomEasyMap.length);
  const entry = idiomEasyMap[index];
  return new Idiom(entry[0], entry[1], date);
}

function get(idiom: string) {
  let result = idiomEasyMap.find(it => it[0] == idiom);
  if (!result) result = idiomAddtionMap.find(it => it[0] == idiom);
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
    .replace(/[ōóǒò]/g, 'o')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[üǖǘǚǜ]/g, 'v');
}

function isPinyinSimilar(a: string, b: string) {
  return simplifyPinyin(a) == simplifyPinyin(b);
}

function removePinyinNg(pinyin: string) {
  return pinyin.endsWith('g') ? pinyin.substring(0, pinyin.length - 1) : pinyin;
}

function simplifyPinyin(pinyin: string) {
  return removePinyinTone(removePinyinNg(pinyin));
}

function getPinyinTone(pinyin: string) {
  if (pinyin.match(/[āēōīūǖ]/)) return 1;
  else if (pinyin.match(/[áéóíúǘ]/)) return 2;
  else if (pinyin.match(/[ǎěǒǐǔǚ]/)) return 3;
  else if (pinyin.match(/[àèòìùǜ]/)) return 4;
  else return 0;
}

export default {
  today,
  get,
  removePinyinTone,
  isPinyinSimilar,
  getPinyinTone,
};

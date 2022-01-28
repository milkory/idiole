<script setup lang="ts">
import { Ref, ref } from 'vue';
import Header from './components/Header.vue';
import Toast from './components/Toast.vue';
import Board from './components/Board.vue';
import Input from './components/Input.vue';
import { Tile, TileState } from './types';
import idioms from './idioms';
import storage from './storage';

const answer = idioms.today();

let toastMessage = ref('');
let toastTimeout: number;
let isGameEnd = ref(false);

const board = ref(new Array<Array<Tile>>());
const boardElement = ref() as Ref<any>;

storage.load();
Tile.fromGuesses(storage.getTodayGuess(), answer).forEach(it => board.value.push(it));
storage.pushLastPlayed(answer.date);

if (checkWin()) {
  isGameEnd.value = true;
} else {
  newLine();
}

function toast(message: string, time = 2000) {
  toastMessage.value = message;
  if (time > 0) {
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastMessage.value = '';
    }, time);
  }
}

function input(content: string) {
  let line = getLastLine();
  let inputted = false;
  for (let character of content.split('')) {
    let tile = line.find(it => !it.isFilled());
    if (tile) {
      tile.character = character;
      inputted = true;
    } else {
      break;
    }
  }
  if (line[3].isFilled()) {
    Tile.rubyTiles(line);
    for (let tile of line) {
      for (let i = 0; i < board.value.length - 1; i++) {
        let checkLine = board.value[i];
        for (let checkTile of checkLine) {
          if (idioms.isPinyinSimilar(tile.pinyin, checkTile.pinyin)) {
            tile.highlightPinyin = true;
            checkTile.highlightPinyin = true;
          }
        }
      }
    }
  }
}

function clearTile() {
  let line = getLastLine();
  let tile = line.reverse().find(it => it.isFilled());
  line.reverse();
  if (tile) {
    tile.character = '';
    if (tile.pinyin) {
      line.forEach(it => (it.pinyin = ''));
      clearHighlight();
    }
  }
}

function submit() {
  let line = getLastLine();
  if (line.some(it => !it.isFilled())) {
    toast('填完再提交😠');
  } else {
    if (!Tile.transfromTiles(line, answer)) {
      toast('不知所云');
    } else {
      storage.pushGuess(Tile.toString(line));
      clearHighlight();
      if (checkWin()) {
        toast('你赢🌶️');
        isGameEnd.value = true;
      } else {
        newLine();
      }
      setTimeout(() => boardElement.value.scrollToTheEnd(), 1);
    }
  }
}

function newLine() {
  board.value.push(Tile.newLine());
}

function getLastLine() {
  return board.value[board.value.length - 1];
}

function checkWin() {
  return board.value.length > 0 && getLastLine().every(it => it.state == TileState.Exact);
}

function shake() {}

function clearHighlight() {
  board.value.forEach(line => line.forEach(tile => (tile.highlightPinyin = false)));
}
</script>

<template>
  <Toast :message="toastMessage" />
  <div class="game">
    <Header @help="toast('TODO')" @stat="toast('TODO')" @setting="toast('TODO')" />
    <Board :content="board" ref="boardElement" />
    <Input @input="input" @submit="submit" @delete="clearTile" :is-game-end="isGameEnd" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.game {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
}
</style>

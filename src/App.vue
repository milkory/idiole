<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Toast from './components/Toast.vue';
import Board from './components/Board.vue';
import Input from './components/Input.vue';
import { Tile, TileState } from './types';
import idioms from './idioms';

const answer = idioms.today();

let toastMessage = ref(`${answer.idiom}, ${answer.pinyin}`);
let toastTimeout: number;

const board = ref(new Array<Array<Tile>>());

board.value.push(Tile.fromGuess('尊猪啊啧', answer));
board.value.push(Tile.newLine());

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
  for (let character of content.split('')) {
    let tile = line.find(it => !it.isFilled());
    if (tile) {
      tile.character = character;
    } else {
      break;
    }
  }
}

function clearTile() {
  let line = getLastLine();
  let tile = line.reverse().find(it => it.isFilled());
  line.reverse();
  if (tile) {
    tile.character = ''
  }
}

function submit() {
  let line = getLastLine();
  if (line.some(it => !it.isFilled())) {
    toast('NOT SO FAST!')
  } else {
    toast('SUBMITTED! But nothing happened :<')
  }
}

function getLastLine() {
  return board.value[board.value.length - 1];
}
</script>

<template>
  <Toast :message="toastMessage" />
  <div class="game">
    <Header @help="toast('TODO')" @stat="toast('TODO')" @setting="toast('TODO')" />
    <Board :content="board" />
    <Input @input="input" @submit="submit" @delete="clearTile" />
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

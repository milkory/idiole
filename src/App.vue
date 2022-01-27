<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Toast from './components/Toast.vue';
import Board from './components/Board.vue';
import { Tile, TileState } from './types';

let toastMessage = ref('');
let toastTimeout: number;

const board = ref(new Array<Array<Tile>>());
board.value.push([new Tile('四', TileState.Absent), new Tile('字', TileState.Present), new Tile('成', TileState.Almost), new Tile('语', TileState.Exact)]);
board.value.push([new Tile('四', TileState.Empty), new Tile('字', TileState.Empty), new Tile('', TileState.Empty), new Tile('', TileState.Empty)]);

function toast(message: string, time = 2000) {
  toastMessage.value = message;
  if (time > 0) {
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastMessage.value = '';
    }, time);
  }
}
</script>

<template>
  <Toast :message="toastMessage" />
  <div class="game">
    <Header @help="toast('TODO')" @stat="toast('TODO')" @setting="toast('TODO')" />
    <Board :content="board" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.game {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { Tile } from '../types';

const props = defineProps({ content: Array });
const board = computed(() => props.content as Array<Array<Tile>>);
</script>

<template>
  <div class="board-container">
    <div class="board">
      <div class="line" v-for="line in board">
        <div v-for="tile in line" :class="['tile', tile.state, tile.character && 'filled']">
          <div class="character">
            {{ tile.character }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
}

.board {
  display: grid;
  row-gap: 5px;
}

.line {
  display: grid;
  grid-template-columns: repeat(4, 68px);
}

.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  color: #fff;
}

.character {
  font-size: 30px;
  margin: 5px 0;
}

.tile.empty {
  border: 2px solid #d3d6da;
  height: 60px;
  width: 60px;
  color: #000;
}
.tile.empty.filled {
  border: 2px solid #999;
}

.tile.exact {
  background-color: #6aaa64;
}

.tile.almost {
  background-color: #aa8dd7;
}

.tile.present {
  background-color: #c9b458;
}

.tile.absent {
  background-color: #787c7e;
}
</style>

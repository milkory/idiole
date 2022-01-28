<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { Tile } from '../types';

const props = defineProps({ content: Array });
const board = computed(() => props.content as Tile[][]);
defineExpose({ scrollToTheEnd });

const container = ref() as Ref<HTMLDivElement>;

function scrollToTheEnd() {
  let ele = container.value;
  if (ele.scrollHeight > ele.clientHeight) {
    ele.scrollTop = ele.scrollHeight;
  }
}
</script>

<template>
  <div class="board-container" ref="container">
    <div class="board">
      <div class="line" v-for="line in board">
        <div v-for="tile in line" :class="['tile', tile.state, tile.character && 'filled']">
          <div class="character" :class="[tile.pinyin && 'parsed']">
            <div class="ruby" :class="[tile.highlightPinyin && 'highlight']">
              {{ tile.pinyin }}
            </div>
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
  overflow: auto;
  max-height: 80%;
  margin: 10px;
}

.board {
  display: grid;
  row-gap: 5px;
}

.line {
  display: grid;
  grid-template-columns: repeat(4, 68px);
}

.character {
  transform: translateY(1px);
  line-height: 24px;
}

.character.parsed {
  transform: translateY(-6px);
}

.ruby {
  font-size: 12px;
  letter-spacing: 0.5px;
  transform: translateX(0.5px);
}

.highlight {
  color: yellow;
}

.empty .highlight {
  color: royalblue;
}

.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  color: #fff;
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

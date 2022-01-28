<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { Tile } from '../types';

const props = defineProps({ content: Array, shakeIndex: Number });
const board = computed(() => props.content as Tile[][]);
defineExpose({ scrollToTheEnd, submit });

const container = ref() as Ref<HTMLDivElement>;

function scrollToTheEnd() {
  let ele = container.value;
  if (ele.scrollHeight > ele.clientHeight) {
    ele.scrollTop = ele.scrollHeight;
  }
}

function submit(callback: () => void) {
  callback();
}
</script>

<template>
  <div class="board-container" ref="container">
    <div class="board">
      <div v-for="(line, index) in board" :class="['line', index == shakeIndex && 'shake']">
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
  transition: all;
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
  animation: zoom 0.2s;
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

.tile.little {
  background-color: #c1694f;
}

@keyframes zoom {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translateX(1px);
  }
  10% {
    transform: translateX(-2px);
  }
  20% {
    transform: translateX(2px);
  }
  30% {
    transform: translateX(-2px);
  }
  4% {
    transform: translateX(2px);
  }
  50% {
    transform: translateX(-2px);
  }
  60% {
    transform: translateX(2px);
  }
  70% {
    transform: translateX(-2px);
  }
  80% {
    transform: translateX(2px);
  }
  90% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(1px);
  }
}
</style>

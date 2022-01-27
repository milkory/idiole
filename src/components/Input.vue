<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['input', 'submit', 'delete']);

let isComposing = false;

function onInput(e: Event) {
  if (!isComposing) {
    let element = e.target as HTMLInputElement;
    emit('input', element.value);
    element.value = '';
  }
}

function onCompositionStart() {
  isComposing = true;
}

function onCompositionEnd(e: Event) {
  isComposing = false;
  onInput(e);
}

function onKeyDown(e: KeyboardEvent) {
  let key = e.key;
  if (key === 'Backspace') {
    emit('delete');
  } else if (key === 'Enter') {
    emit('submit');
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown));
onUnmounted(() => window.removeEventListener('keydown', onKeyDown));
</script>

<template>
  <div class="input-container">
    <div>
      <input
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        class="input character"
      />
    </div>
  </div>
</template>

<style>
.input-container {
  height: 100px;
}

.input {
  height: 60px;
  width: 60px;
  text-align: center;
}

.submit-button {
  height: 60px;
  width: 60px;
}
</style>

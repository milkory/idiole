<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Toast from './components/Toast.vue';

let toastMessage = ref('');
let toastTimeout: number;

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
  <!-- <Poptip :message="poptipMessage" /> -->
  <Toast :message="toastMessage" />
  <Header @help="toast('TODO')" @stat="toast('TODO')" @setting="toast('TODO')" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script setup lang="ts">
defineProps({ message: String });
</script>

<template>
  <transition name="fade">
    <div class="toast" v-if="message">
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: absolute;
  left: 50%;
  top: 100px;
  color: #fff;
  background-color: #1a1a1b;
  transform: translateX(-50%);
  padding: 12px 16px;
  border-radius: 4px;
  z-index: 2;
}
</style>

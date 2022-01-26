<script setup lang="ts">
defineEmits(['help', 'stat', 'setting']);
</script>

<template>
  <div class="header">
    <div>
      <button @click="$emit('help')">
        <i class="far fa-question-circle"></i>
      </button>
    </div>
    <div class="title">IDIOLE</div>
    <div>
      <button @click="$emit('stat')">
        <i class="fas fa-trophy"></i>
      </button>
      <button @click="$emit('setting')">
        <i class="fas fa-cog"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #d3d6da;
}

.title {
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 0.2rem;
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
}

button {
  border: none;
  background: none;
  padding: 0 6px;
  cursor: pointer;
}

button > i {
  color: #878a8c;
  font-size: 21px;
}
</style>

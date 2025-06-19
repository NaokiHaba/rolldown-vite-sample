<template>
  <div class="complex-component">
    <h3>Complex Component with Multiple Dependencies</h3>
    <div class="grid">
      <div v-for="i in 20" :key="i" class="grid-item">
        <NestedComponent :index="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NestedComponent from './NestedComponent.vue'
</script>

<style scoped>
.complex-component {
  margin: 20px auto;
  max-width: 1000px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.grid-item {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
</style>
<template>
  <div>
    <h1>Vite + Vue + Rolldown Performance Playground</h1>
    <div class="metrics">
      <h2>Build Performance Metrics</h2>
      <p>This playground is set up to compare build performance between standard Vite and Rolldown-vite.</p>
      <p>Current bundler: {{ bundler }}</p>
    </div>
    <HelloWorld msg="Performance Test Component" />
    <LargeList :items="largeArray" />
    <ComplexComponent />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import LargeList from './components/LargeList.vue'
import ComplexComponent from './components/ComplexComponent.vue'

const bundler = ref(import.meta.env.VITE_BUNDLER || 'Vite')

const largeArray = computed(() => {
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.random()
  }))
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.metrics {
  background: #f0f0f0;
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  border-radius: 8px;
}
</style>
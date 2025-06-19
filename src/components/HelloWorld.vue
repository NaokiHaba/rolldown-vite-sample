<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>Counter: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
const increment = () => {
  count.value++
}
</script>

<style scoped>
.hello {
  margin: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
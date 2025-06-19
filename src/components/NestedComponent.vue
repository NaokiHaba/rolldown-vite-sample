<template>
  <div class="nested">
    <p>Item {{ index }}</p>
    <small>{{ computedValue }}</small>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  index: Number
})

const computedValue = computed(() => {
  return `Computed: ${props.index * 2}`
})
</script>

<style scoped>
.nested {
  background: #f9f9f9;
  padding: 5px;
  border-radius: 4px;
}
</style>
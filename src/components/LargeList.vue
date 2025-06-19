<template>
  <div class="large-list">
    <h3>Large List Component ({{ items.length }} items)</h3>
    <div class="list-container">
      <div v-for="item in visibleItems" :key="item.id" class="list-item">
        <span>{{ item.name }}</span>
        <span>{{ item.value.toFixed(2) }}</span>
      </div>
    </div>
    <button @click="showMore">Show {{ showAll ? 'Less' : 'More' }}</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: Array
})

const showAll = ref(false)

const visibleItems = computed(() => {
  return showAll.value ? props.items : props.items.slice(0, 10)
})

const showMore = () => {
  showAll.value = !showAll.value
}
</script>

<style scoped>
.large-list {
  margin: 20px auto;
  max-width: 800px;
}

.list-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}
</style>
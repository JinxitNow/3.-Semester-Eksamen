<script setup>
import { ref } from 'vue'
import EventCard from './Eventcard.vue'
import { events as baseEvents } from '../../src/assets/events.js'

const events = ref([...baseEvents])
</script>

<template>
  <div class="event-list">
    <Eventcard
      v-for="event in events"
      :key="event.name"
      :event="event"
    />
  </div>
</template>

<style scoped>
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>

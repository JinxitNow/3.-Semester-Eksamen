<!--Eventfeed.vue er en container, der pakker EventKalender ind og giver mulighed for 
at sende props (som showYouthEvents) til kalenderen.  Det gør det nemt at styre visningen af events fra ét sted.-->

<script setup>
import { ref } from 'vue'
import EventKalender from '../components/Eventkalender.vue'

const showYouthEvents = ref(true)

</script>

<template>
  <section class="event-feed">
    <!-- EventKalender-komponenten modtager nu showYouthEvents som prop -->
    <EventKalender :showYouthEvents="showYouthEvents" />
  </section>
</template>

<style scoped>
.event-feed {
  padding: 2rem;
}
</style>

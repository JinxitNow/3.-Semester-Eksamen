<!--Eventfeed.vue er en container, der pakker EventKalender ind og giver mulighed for 
at sende props (som showYouthEvents) til kalenderen.  Det gør det nemt at styre visningen af events fra ét sted.-->

<script setup>
import { ref } from 'vue';
import EventKalender from '../components/Eventkalender.vue';
 import Registration from "../components/Registration.vue";
    import Hero from "../components/Hero.vue";

const showYouthEvents = ref(true)

</script>

<template>
  <div id="app">
    <Hero />

    <section class="event-feed">
      <EventKalender :showYouthEvents="showYouthEvents" />
    </section>

    <Registration />
  </div>
</template>


<style scoped>
.event-feed {
  padding: 2rem;
}
</style>

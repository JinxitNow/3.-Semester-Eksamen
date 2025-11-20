<script setup>
import { ref } from "vue";
import Hero from "../components/Hero.vue";
import JoinUsSection from "../components/JoinUsSection.vue";
import EventKalender from "../components/Eventkalender.vue";
import GratisSection from "../components/GratisSection.vue";   
import Registration from "../components/Registration.vue";
const showYouthEvents = ref(true);
</script>


<template>
  <div id="app">
    <Hero />

    <!-- Join Us Section -->
    <JoinUsSection />                <!-- <-- tilføjet her -->



   <!-- Event feed med id -->
    <section id="event-feed" class="event-feed">
    <EventKalender :showYouthEvents="showYouthEvents" />
    </section>

    <!-- Gratis Section -->
  <GratisSection />
    <Registration />
    
    
  </div>
</template>

<style scoped>
.event-feed {
  padding: 2rem;
}
</style>

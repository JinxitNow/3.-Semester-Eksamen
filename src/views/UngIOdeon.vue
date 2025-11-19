<template>
  <div class="ungiodeon-page">

    <Hero />

    <JoinUsSection />

    <section class="event-feed">
      <EventKalender :showYouthEvents="showYouthEvents" />
    </section>

    <Registration />

  </div>
</template>

<script setup>
import { ref } from "vue";
import Hero from "../components/Hero.vue";
import JoinUsSection from "../components/JoinUsSection.vue";
import EventKalender from "../components/Eventkalender.vue";
import Registration from "../components/Registration.vue";

const showYouthEvents = ref(true);
</script>

<style scoped>
.event-feed {
  padding: 2rem;
}
</style>

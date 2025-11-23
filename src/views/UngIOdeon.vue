<script setup>
import { ref, watch, nextTick } from "vue";
import Hero from "../components/Hero.vue";
import EventKalender from "../components/Eventkalender.vue";
import Registration from "../components/Registration.vue";
import InfoBoxes from "../components/InfoBoxes.vue";
import AboutMembership from "../components/AboutMembership.vue";

// Importér billeder korrekt via Vite
import cafe1 from '../assets/img/cafe1.webp';
import Hero6 from '../assets/img/hero6.webp';

const showForm = ref(false);
const registrationForm = ref(null);

// Watcher der scroller, når formularen vises
watch(showForm, async (newVal) => {
  if (newVal) {
    await nextTick(); // vent til DOM er opdateret
    registrationForm.value?.scrollIntoView({ behavior: "smooth" });
  }
});
</script>


<template>
  <div id="app">
    <!-- Hero-sektion -->
    <Hero />
    <br />

    <!-- Første InfoBox -->
    <InfoBoxes
      :image="cafe1"
      title="Join UNG I ODEON – hvor det sker!"
      text="Vil du være først til alt det sjove? Som medlem af UNG I ODEON får du adgang til de vildeste koncerter, workshops, foredrag og hemmelige events, 
      før alle andre. Få rabatter på mad, drikke og billetter – og oplev ODEON på en helt ny måde. Bliv en del af fællesskabet, 
      skab minder og gå aldrig glip af noget!"
      linkText="Bliv gratis medlem"
       @click="showForm = true"
    />

    <!-- Event feed -->
    <section id="event-feed" class="event-feed">
      <EventKalender />
    </section>

    <br />

    <!-- Anden InfoBox -->
    <InfoBoxes
      :image="Hero6"
      title="Gå ikke glip af disse 3 GRATIS events!"
      text="December bliver helt vild på ODEON! Vi har samlet tre fede oplevelser, du ikke må gå glip af – og det bedste? 
      Det er helt gratis. Musik, workshops og overraskelser venter på dig. Tag dine venner under armen og oplev ODEON på sit 
      mest magiske i december!"
      linkText="Se dem her"
      linkUrl="/events/gratis"
    />

    <br />

    <!-- Medlemssektion -->
    <div>
      <AboutMembership v-if="!showForm" @signup="showForm = true" />
        <div v-else ref="registrationForm">
          <Registration />
     </div>
</div>


    <br />
  </div>
</template>

<style scoped>
/* --- Mobile first --- */
#app {
  padding: 0 0rem;
}

br {
  margin-bottom: 1rem;
}

/* Event feed margin */
.event-feed {
  margin: 2rem 0;
}
</style>

<script setup>
import { ref } from "vue";
import Hero from "../components/Hero.vue";
import JoinUsSection from "../components/JoinUsSection.vue";
import EventKalender from "../components/Eventkalender.vue";
import GratisSection from "../components/GratisSection.vue";   
import Registration from "../components/Registration.vue";
import InfoBoxes from "../components/InfoBoxes.vue";
const showYouthEvents = ref(true);
</script>


<template>
  <div id="app">
    <Hero />
<br></br>

 <InfoBoxes
  image="src/assets/img/cafe1.webp"
  title="Biv medlem i dag og joine et stor fællesskab"
  text="UNG I ODEON samler alle de fedeste events for dig – koncerter, foredrag, workshops og meget mere.
Hold dig opdateret og oplev, hvad der rører sig på ODEON – lige her, lige nu!

Få rabatter på events, mad og drikkevarer i cafeen, og mange andre ting som medlem af UNG I ODEON!"
  linkText="Bliv gratis medlem"
  linkUrl="/events/kor"
/>



    <!-- Join Us Section -->
    <JoinUsSection />               



   <!-- Event feed med id -->
    <section id="event-feed" class="event-feed">
    <EventKalender :showYouthEvents="showYouthEvents" />
    </section>

    <!-- Gratis Section -->
  <GratisSection />
    <Registration />
    
    
  </div>
</template>

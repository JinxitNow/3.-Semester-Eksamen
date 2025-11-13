<template>
  <div>
    <Header />
    <Hero />
    <InfobBoxes />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Seachbar from ',components/Searchbar.vue'
import Hero from './components/Hero.vue'
import Infoboxes from ',/components/InfoBoxes.vue'
import EventFooter from './components/Footer.vue'
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

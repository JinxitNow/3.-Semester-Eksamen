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
</script>
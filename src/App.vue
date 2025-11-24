<script setup>
import Header from './components/Header.vue'
import FooterComponent from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <div class="header-spacer"></div> <!-- giver plads under headeren -->
    
    <router-view /> <!-- her vises dine views -->
    <FooterComponent />
  </div>
</template>



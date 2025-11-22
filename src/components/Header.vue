<script setup>
import { ref } from 'vue'
import Logo from '../assets/logo/logo_rgb_main_transparent.png'

const headerOpen = ref(false)

function toggleHeader() {
  headerOpen.value = !headerOpen.value
}

function closeHeader() {
  headerOpen.value = false
}
</script>

<template>
  <header class="main-header">
    <!-- Topbar -->
    <div class="topbar">
      <ul class="topbar-links">
        <li><router-link to="/login">Log in</router-link></li>
        <li><a href="#">Nyheder/nyhedsbrev</a></li>
        <li><a href="#">Hotel</a></li>
        <li><a href="#">Venue Specs</a></li>
        <li><a href="#">Praktisk Info</a></li>
        <li><a href="#">Om ODEON</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>

      <div class="header-divider"></div>

      <ul class="topbar-links second-row">
        <li><a href="#">Kalender</a></li>
        <li><a href="https://sem-eksamen-adb47.web.app">Ung i ODEON</a></li>
        <li><a href="#">Mad & Drikke</a></li>
        <li><a href="#">Konference & Møde</a></li>
      </ul>
    </div>

    <!-- Main row -->
    <div class="main-row">
     <div class="logo-container">
  <a href="https://sem-eksamen-adb47.web.app">
    <img class="header-logo" :src="Logo" alt="ODEON logo" />
  </a>
</div>

      <button class="burger" @click="toggleHeader" aria-label="Menu">☰</button>
    </div>

    <!-- Mobile menu -->
    <ul class="topbar-links mobile" :class="{ open: headerOpen }">
      <li><router-link to="/login" @click="closeHeader">Log in</router-link></li>
      <li><a href="#" @click="closeHeader">Nyheder/nyhedsbrev</a></li>
      <li><a href="#" @click="closeHeader">Hotel</a></li>
      <li><a href="#" @click="closeHeader">Venue Specs</a></li>
      <li><a href="#" @click="closeHeader">Praktisk Info</a></li>
      <li><a href="#" @click="closeHeader">Om ODEON</a></li>
      <li><a href="#" @click="closeHeader">FAQ</a></li>
      <li><a href="#" @click="closeHeader">Kalender</a></li>
     <li><a href="https://sem-eksamen-adb47.web.app" @click="closeHeader">Ung i ODEON</a></li>
      <li><a href="#" @click="closeHeader">Mad & Drikke</a></li>
      <li><a href="#" @click="closeHeader">Konference & Møde</a></li>
    </ul>
  </header>
</template>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  display: flex;
  flex-direction: column;

  /* fade starter tidligere, så links "svæver" */
  background: linear-gradient(
    to bottom,
    #EFEFEF 40%,               /* solid farve kun til ca. under teksten */
    rgba(239, 239, 239, 0) 100% /* fade resten */
  );

  box-sizing: border-box;
  padding-right: 8.7rem;
}

.topbar {
  width: 100%;
}

.topbar-links {
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0.5rem 1rem;
  gap: 2rem;
}

.topbar-links li a {
  color: #947E4A;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.topbar-links li a:hover {
  color: #7d6a3e;
}

.header-divider {
  width: 100%;
  height: 1px;
  background-color: #947E4A;
}

.main-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}

.logo-container {
  flex-shrink: 0;
  display: flex;
  align-items: flex-end; /* presser logoet ned mod linjen */
}

.header-logo {
  height: 90px;
  margin-top: -60px; /* flytter logoet lidt op */
  margin-left: -45px;
}

.burger {
  display: none;
  background: none;
  border: none;
  font-size: 1.7rem;
  color: #947E4A;
  cursor: pointer;
}

/* ==== Mobil styling ==== */
@media (max-width: 861px) {
  .topbar-links { display: none; }

  .main-row { padding: 1rem 0; }
  .burger { display: block; font-size: 1.8rem; }

  .logo-container { margin-right: 1rem; }
  .header-logo { height: 65px; margin-top: -4px; }
  .header-divider { display: none; }

  /* Burger menu container */
.topbar-links.mobile {
  display: none;
  flex-direction: column;
  width: 100%;
  background-color: #EFEFEF;
  padding: 0.5rem 0;
  border-top: 1px solid #947E4A;

  max-height: 80vh;          /* fylder max 80% af skærmhøjden */
  overflow-y: auto;          /* gør det muligt at scrolle */
  -webkit-overflow-scrolling: touch; /* smooth scroll på iOS */
}


.topbar-links.mobile.open {
  display: flex;
}


  /* Menu items */
 .topbar-links.mobile li {
  width: 100%;
  padding: 0.5rem 1rem; /* mindre padding */
}

  .topbar-links.mobile li:last-child {
    border-bottom: none;
  }

  .topbar-links.mobile li a {
    font-size: 0.85rem; /* lidt mindre tekst */
    font-weight: 600;
    color: #947E4A;
    display: block;
    width: 100%;
    text-decoration: none; 
    line-height: 0.7;     /* tættere linjeafstand */
  }


  .topbar-links.mobile li a:hover {
    background-color: rgba(148, 126, 74, 0.1); /* diskret hover */
    border-radius: 4px;
  }
}


/* ==== Desktop styling ==== */
@media (min-width: 861px) {
  .topbar-links.mobile { display: none; }
}
</style>

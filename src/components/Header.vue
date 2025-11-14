<script setup>
import { ref } from 'vue'
import Logo from '../assets/logo/logo_rgb_main_transparent.png'

const headerOpen = ref(false)

function toggleHeader() {
  headerOpen.value = !headerOpen.value
}
</script>

<template>
  <header class="main-header">

    <!-- Topbar -->
    <div class="topbar">
      <ul class="topbar-links">
        <li><a href="#">Log in</a></li>
        <li><a href="#">Nyheder/nyhedsbrev</a></li>
        <li><a href="#">Hotel</a></li>
        <li><a href="#">Venue Specs</a></li>
        <li><a href="#">Praktisk Info</a></li>
        <li><a href="#">Om ODEON</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>

      <!-- Divider i topbar -->
      <div class="header-divider"></div>

      <!-- Nye links under de eksisterende links i topbar-->
      <ul class="topbar-links second-row">
        <li><a href="#">Kalender</a></li>
        <li><a href="#">Ung i ODEON</a></li>
        <li><a href="#">Mad & Drikke</a></li>
        <li><a href="#">Konference & Møde</a></li>
      </ul>
    </div>

    <!-- Main row med logo + burger-knap -->
    <div class="main-row">
      <div class="logo-container">
        <img class="header-logo" :src="Logo" alt="ODEON logo" />
      </div>

      <!-- Burger-knap til mobil -->
      <button class="burger" @click="toggleHeader">☰</button>
    </div>

    <!-- Links container (topbar-links kun synlige på mobil når burger-menuen er åben) -->
    <ul class="topbar-links mobile" :class="{ open: headerOpen }">
      <li><a href="#">Log in</a></li>
      <li><a href="#">Nyheder/nyhedsbrev</a></li>
      <li><a href="#">Hotel</a></li>
      <li><a href="#">Venue Specs</a></li>
      <li><a href="#">Praktisk Info</a></li>
      <li><a href="#">Om ODEON</a></li>
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Kalender</a></li>
      <li><a href="#">Ung i ODEON</a></li>
      <li><a href="#">Mad & Drikke</a></li>
      <li><a href="#">Konference & Møde</a></li>
    </ul>
  </header>
</template>

<style scoped>
.main-header {
  background-color: #EFEFEF;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.topbar {
  width: 100%;
  background-color: #EFEFEF;
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
}

.header-logo {
  height: 60px;
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
@media (max-width: 768px) {

  /* Skjul topbar links på mobil - de skal kun vises i burger-menuen */
  .topbar-links {
    display: none;
  }

  .main-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
  }

  .burger {
    display: block;
    font-size: 1.7rem;
    color: #947E4A;
    cursor: pointer;
    z-index: 10;
    margin-left: 10rem;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 2rem;
  }

  .header-logo {
    height: 70px;
  }

  .header-divider {
    display: none;
  }

  .topbar-links.mobile {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #EFEFEF;
    padding: 1rem 0;
  }

  .topbar-links.mobile.open {
    display: flex;
  }

  .topbar-links.mobile li {
    width: 100%;
  }

  .topbar-links.mobile li a {
    font-size: 1rem;
    display: block;
    width: 100%;
  }
}

/* ==== Ekstra Desktop styling ==== */
@media (min-width: 769px) {

  /* Skjul topbar-links mobile på desktop */
  .topbar-links.mobile {
    display: none;
  }

  /* Tættere på divideren kun i desktop */
  .main-row {
    margin-top: -10px;
  }

  .logo-container {
    margin-top: -50px;
  }
}
</style>

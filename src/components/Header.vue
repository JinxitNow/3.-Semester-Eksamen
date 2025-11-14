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

    <!-- Topbar: Første række med links -->
    <div class="topbar">
      <ul class="topbar-links">
        <li><a href="#">Log in</a></li>
        <li><a href="#">Nyheder/nyhedsbrev</a></li>
        <li><a href="#">Hotel</a></li>
        <li><a href="#">Venue Specs</a></li>
        <li><a href="#">Praktisk Info</a></li>
        <li><a href="#">Om ODEON</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Kontakt</a></li>
      </ul>
    </div>

    <!-- Divider -->
    <div class="header-divider"></div>

    <!-- Main header: anden række + logo -->
    <div class="main-header-row">
      <button class="burger" @click="toggleHeader">☰</button>

      <div :class="['nav-container', { open: headerOpen }]">
        <div class="logo-container">
          <img class="header-logo" :src="Logo" alt="ODEON logo" />
        </div>
        <ul class="nav-links">
          <li><a href="#">Kalender</a></li>
          <li><a href="#">Ung i ODEON</a></li>
          <li><a href="#">Mad & Drikke</a></li>
          <li><a href="#">Konferencer & Møder</a></li>
        </ul>
      </div>
    </div>

  </header>
</template>

<style scoped>
.main-header {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.topbar {
  width: 100%;
  background-color: #EFEFEF;
  box-sizing: border-box;
}

.topbar-links {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.topbar-links li a {
  color: #947E4A;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  font-size: 0.85rem;
}

.topbar-links li a:hover {
  color: #7d6a3e;
}

.header-divider {
  width: 100vw;
  height: 1px;
  background-color: #947E4A;
  margin: 0;
}

.main-header-row {
  width: 100vw;
  background-color: #EFEFEF;
  box-sizing: border-box;
  position: relative;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.nav-container {
  display: flex;
  justify-content: space-between; /* logo til venstre, links til højre */
  align-items: flex-start;
  width: 100%;
  margin-top: 0;
}

.logo-container {
  display: flex;
  align-items: center;
}

.header-logo {
  height: 60px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0; /* fjern margin */
}

.nav-links li a {
  color: #947E4A;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  font-size: 0.85rem;
}

.nav-links li a:hover {
  color: #7d6a3e;
}

/* Burger skjules på desktop*/
.burger {
  display: none;
  background: none;
  border: none;
  font-size: 1.7rem;
  color: #947E4A;
  cursor: pointer;
  align-self:flex-end;
}

/* ===============================
   MOBILE STYLING
================================ */
@media (max-width: 768px) {
  .topbar {
    display: none; /* skjul topbar */
  }

  .header-divider {
    display: none; /* skjul divider */
  }

  .burger {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
  }

  .nav-container {
    flex-direction: column;
    align-items: flex-start;
    display: none;
    width: 100%;
  }

  .nav-container.open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .nav-links li a {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    display: block;
  }

  .logo-container {
    margin-bottom: 0.5rem;
  }

  .header-logo {
    height: 35px;
  }
}
</style>

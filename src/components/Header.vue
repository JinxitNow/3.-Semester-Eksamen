<script setup>
import { ref } from 'vue'
import logo from '../assets/images/logo.jpg'

const topBarOpen = ref(false)

function toggleTopBar() {
  topBarOpen.value = !topBarOpen.value
}
</script>

<template>
  <header class="main-header">
    <div class="top-bar container">
      <button class="burger" @click="toggleTopBar">☰</button>

      <ul :class="{ open: topBarOpen }">
        <li><a href="#">Nyheder/nyhedsbrev</a></li>
        <li><a href="#">Hotel</a></li>
        <li><a href="#">Venue Specs</a></li>
        <li><a href="#">Praktisk Info</a></li>
        <li><a href="#">Om ODEON</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Kontakt</a></li>
      </ul>
    </div>

    <!-- Divider/streg mellem topbar og navigation -->
    <div class="divider"></div>

    <!-- Logo og navigation på samme linje -->
    <div class="nav-container container">
      <div class="logo">
        <img :src="logo" alt="ODEON logo" />
      </div>

      <nav class="main-nav">
        <ul>
          <li><a href="#">Kalender</a></li>
          <li><a href="#">Ung i ODEON</a></li>
          <li><a href="#">Mad & Drikke</a></li>
          <li><a href="#">Konference & møder</a></li>
        </ul>
      </nav>
    </div>

    <!-- Header-->
    <h1>
      UNG i ODEON samler alle de fedeste events for dig – koncerter, foredrag, workshops og meget mere.
      <br>
      Hold dig opdateret og oplev, hvad der rører sig på ODEON – lige her, lige nu!
    </h1>
  </header>
</template>

<style scoped>
/* === Burger-knap === */
.burger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #84754e;
  cursor: pointer;
}

/* === Topbar === */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar ul {
  display: flex;
  justify-content: flex-end;
  list-style: none;
  gap: 1.5rem;
  margin-left: auto;
  padding: 0;
}

/* === Divider === */
.divider {
  height: 1px;
  background-color: #433719;
  margin: 0.6rem 0;
}

/* === Navigation === */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-nav ul {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

/* === Mobilvisning === */
@media (max-width: 768px) {
  /* Burgeren synlig */
.burger {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  /* Skjul topbar-menu som standard */
  .top-bar ul {
    display: none;
    flex-direction: column;
    gap: 0.3rem;
    margin-left: 0;
    align-items: flex-start;
    padding-left: 1rem;
  }

  /* Når menuen er åben */
  .top-bar ul.open {
    display: flex;
  }

  .top-bar ul.open li a {
    font-size: 1.2rem;
    text-align: left;
    width: 100%;
  }

    .top-bar ul li a {
    position: relative;
    display: inline-block;
  }

  .top-bar ul li a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0%;
    height: 2px;
    background-color: #84754e;
    transition: width 0.3s ease;
  }

  .top-bar ul li a:hover::after,
  .top-bar ul li a:focus::after {
    width: 100%;
  }

  /* Skjul divider under topbar */
  .divider {
    display: none;
  }

  /* Tilføj ny divider under nav-container */
  .nav-container::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #433719;
    margin-top: 0.6rem;
  }

  /* Stabel logo og navigation vertikalt */
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-nav ul {
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 0.5rem;
  }
}
</style>

<script setup>
import { ref } from 'vue'

const headerOpen = ref(false)

function toggleHeader() {
  headerOpen.value = !headerOpen.value
}
</script>

<template>
  <header class="main-header">
    <div class="header container">
      <button class="burger" @click="toggleHeader">☰</button>

      <ul :class="{ open: headerOpen }">
        <li><a href="#">Nyheder/nyhedsbrev</a></li>
        <li><a href="#">Hotel</a></li>
        <li><a href="#">Venue Specs</a></li>
        <li><a href="#">Praktisk Info</a></li>
        <li><a href="#">Om ODEON</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Kontakt</a></li>
        <li><a href="#">Kalender</a></li>
        <li><a href="#">Ung i ODEON</a></li>
        <li><a href="#">Mad & Drikke</a></li>
        <li><a href="#">Konferencer & Møder</a></li>
      </ul>
    </div>

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

/* === Header === */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header ul {
  display: flex;
  justify-content: flex-end;
  list-style: none;
  gap: 1.5rem;
  margin-left: auto;
  padding: 0;
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

  /* Skjul header-menu som standard */
  .header ul {
    display: none;
    flex-direction: column;
    gap: 0.3rem;
    margin-left: 0;
    align-items: flex-start;
    padding-left: 1rem;
  }

  /* Når menuen er åben */
  .header ul.open {
    display: flex;
  }

  .header ul.open li a {
    font-size: 1.2rem;
    text-align: left;
    width: 100%;
  }

  .header ul li a {
    position: relative;
    display: inline-block;
  }

  .header ul li a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0%;
    height: 2px;
    background-color: #84754e;
    transition: width 0.3s ease;
  }

  .header ul li a:hover::after,
  .header ul li a:focus::after {
    width: 100%;
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

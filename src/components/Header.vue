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
    <div class="header container">
      
      <button class="burger" @click="toggleHeader">☰</button>

      <!-- Første række: 7 links -->
      <ul :class="{ open: headerOpen }">
        <li><a href="#">Nyheder/nyhedsbrev</a></li>
        <li><a href="#">Hotel</a></li>
        <li><a href="#">Venue Specs</a></li>
        <li><a href="#">Praktisk Info</a></li>
        <li><a href="#">Om ODEON</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Kontakt</a></li>
      </ul>

      <!-- Divider mellem rækkerne -->
      <div class="header-divider"></div>

      <!-- Anden række: 4 links -->
      <ul :class="{ open: headerOpen }">
        <li><a href="#">Kalender</a></li>
        <li><a href="#">Ung i ODEON</a></li>
        <li><a href="#">Mad & Drikke</a></li>
        <li><a href="#">Konferencer & Møder</a></li>
      </ul>

      <!-- Logo under anden række -->
      <img class="header-logo" :src="Logo" alt="ODEON logo" />
    </div>
  </header>
</template>

<style scoped>
/* ===== Header baggrund og generel padding ===== */
.main-header {
  width: 100%;
  background-color: #EFEFEF;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
}

/* ===== Container i header (fylder hele bredden) ===== */
.header.container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-sizing: border-box;
}

/* ===== Links ===== */
.header ul li a {
  color: #947E4A;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.header ul li a:hover {
  color: #7d6a3e;
}

/* ===== Desktop Layout ===== */
.header {
  display: flex;
  flex-direction: column; /* UL’erne stablet lodret */
  align-items: stretch;   /* fylder hele bredden */
  gap: 0.5rem;            /* afstand mellem rækkerne */
}

.header ul {
  display: flex;
  justify-content: flex-end; /* links til højre */
  list-style: none;
  gap: 1.2rem;
  margin: 0;
  padding: 0;
}

/* Divider mellem UL’erne */
.header-divider {
  width: 100%;
  height: 2px;
  background-color: #947E4A;
  margin: 0.5rem 0;
}

/* Logo under anden række til venstre */
.header-logo {
  height: 80px;
  margin-top: 0.5rem;
  align-self: flex-start; /* placeres til venstre */
}

/* ===== Burger-knap (skjult på desktop) ===== */
.burger {
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  color: #947E4A;
  cursor: pointer;
}

/* ===== Mobilvisning ===== */
@media (max-width: 768px) {
  .burger {
    display: block;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 10;
  }

  .header {
    align-items: flex-start;
  }

  /* Saml alle UL’er i en kolonne */
  .header ul {
    display: none;
    flex-direction: column;
    width: 100%;
    padding-left: 0;
  }

  /* Når menuen er åben */
  .header ul.open {
    display: flex;
  }

  .header ul li a {
    font-size: 1.2rem;
    padding: 0.4rem 1rem;
    width: 100%;
    display: block;
  }

  /* Fjern margin mellem UL’er på mobil */
  .header ul:first-of-type,
  .header ul:last-of-type {
    margin-top: 0;
    justify-content: flex-start; /* links til venstre for mobil */
  }

  /* Logo på mobil under menu */
  .header-logo {
    height: 35px;
    margin-top: 0.3rem;
    margin-left: 1rem;
    align-self: flex-start;
  }
}

</style>

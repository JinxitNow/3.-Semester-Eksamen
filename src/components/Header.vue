<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Logo from '../assets/logo/logo_rgb_main_transparent.png'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

// Luk menu automatisk ved resize til desktop
function handleResize() {
  if (window.innerWidth > 861) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header class="header-wrapper">
    <!-- Fade baggrund -->
    <div class="header-background"></div>

    <!-- Indhold -->
    <div class="header-container">
      <!-- Topbar -->
      <div class="topbar">
        <ul class="link-row">
          <li><router-link to="/login">Log ind</router-link></li>
          <li><a href="#">Nyheder/nyhedsbrev</a></li>
          <li><a href="#">Hotel</a></li>
          <li><a href="#">Venue Specs</a></li>
          <li><a href="#">Praktisk Info</a></li>
          <li><a href="#">Om ODEON</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>

        <div class="divider-line"></div>

        <ul class="link-row second">
          <li><a href="#">Kalender</a></li>
         <li><router-link to="/" @click="closeMenu">Ung i ODEON</router-link></li>
          <li><a href="#">Mad & Drikke</a></li>
          <li><a href="#">Konference & Møde</a></li>
        </ul>
      </div>

      <!-- Main row -->
      <div class="main-row">
        <div class="logo-container">
          <!-- 👇 ændret til router-link -->
          <router-link to="/">
            <img :src="Logo" alt="ODEON logo" class="header-logo" />
          </router-link>
        </div>

        <button class="burger" @click="toggleMenu" aria-label="Menu">
          {{ menuOpen ? '✕' : '☰' }}
        </button>
      </div>
    </div>

    <!-- Mobilmenu -->
    <nav class="mobile-menu" :class="{ open: menuOpen }">
      <router-link to="/login" @click="closeMenu">Log ind</router-link>
      <a href="#" @click="closeMenu">Nyheder/nyhedsbrev</a>
      <a href="#" @click="closeMenu">Hotel</a>
      <a href="#" @click="closeMenu">Venue Specs</a>
      <a href="#" @click="closeMenu">Praktisk Info</a>
      <a href="#" @click="closeMenu">Om ODEON</a>
      <a href="#" @click="closeMenu">FAQ</a>
      <a href="#" @click="closeMenu">Kalender</a>
    <router-link to="/" @click="closeMenu">Ung i ODEON</router-link>
      <a href="#" @click="closeMenu">Mad & Drikke</a>
      <a href="#" @click="closeMenu">Konference & Møde</a>
    </nav>
  </header>
</template>

<style scoped>

@media (min-width: 861px) {
  .header-logo {
    margin-left: -20px; /* mindre negativ margin = flytter til højre */
  }
}

.header-wrapper {
  position: fixed;
  top: 0;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  z-index: 1000;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(to bottom, #efefef 40%, rgba(239, 239, 239, 0) 100%);
  z-index: 0;
  pointer-events: none;
}

.header-container {
  position: relative;
  z-index: 1;
  padding-left: 3.8rem;
  padding-right: 3.8rem;
  box-sizing: border-box;
}

.topbar {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 0.5rem;
}

.link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: flex-end;
}

.link-row li a,
.link-row li router-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #796535;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-row li a:hover {
  color: #7d6a3e;
}

.divider-line {
  height: 1px;
  background-color: #796535;
  width: 100%;
}

.main-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.5rem 0;
}

.logo-container {
  flex-shrink: 0;
}

.header-logo {
  height: 90px;
  margin-top: -50px;
  margin-left: -33px;
}

.burger {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #796535;
  cursor: pointer;
}

/* Mobilmenu */
.mobile-menu {
  display: none;
  flex-direction: column;
  background-color: #efefef;
  padding: 1rem 3.8rem;
  position: relative;
  z-index: 2;
}

.mobile-menu.open {
  display: flex;
}

.mobile-menu a,
.mobile-menu router-link {
  padding: 0.6rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #796535;
  text-decoration: none;
  text-align: left;
}

/* Responsivitet */
@media (max-width: 861px) {
  .link-row,
  .divider-line {
    display: none;
  }

  .burger {
    display: block;
  }
}
</style>

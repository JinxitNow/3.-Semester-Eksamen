<template>
  <div class="hero-container">
    <!-- Slideshow -->
    <div class="slideshow">
      <transition name="fade" mode="out-in">
        <img
          :src="images[currentIndex]"
          :key="images[currentIndex]"
          class="slide-image"
          alt="slideshow image"
        />
      </transition>
    </div>

    <!-- White fade overlay -->
    <div class="hero-overlay"></div>

    <!-- Text content -->
    <div class="hero-content">
      <h1>UNG I ODEON</h1>
      <button>SE UDVALGTE EVENTS</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

function img(path) {
  return new URL(`../assets/img/${path}`, import.meta.url).href;
}

const images = [
  img("hero1.jpg"),
  img("hero2.webp"),
  img("hero3.webp"),
  img("hero4.webp"),
  img("hero5.webp"),
  img("hero6.webp"),
];

const currentIndex = ref(0);
let interval;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>

/* ============ MOBILE-FIRST ============ */

.hero-container {
  position: relative;
  width: 100%;
  height: 420px; /* Mobil-højde */
  overflow: hidden;
}

.slideshow,
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* White overlay */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.55),
    rgba(255, 255, 255, 0.92)
  );
  pointer-events: none;
}

/* Text content – mobile version */
.hero-content {
  position: absolute;
  top: 55%;
  left: 22px;          /* Rykker alt til venstre på mobil */
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 260px;    /* Giver en flot smal kolonne på mobil */
}

.hero-content h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #5e4a22;
  line-height: 1.1;
}

.hero-content button {
  padding: 12px 24px;
  background-color: #8c7a52;
  color: white;
  border: none;
  font-size: 0.95rem;
  border-radius: 4px;
  cursor: pointer;
}


/* ============ DESKTOP (min-width: 768px) ============ */
@media (min-width: 768px) {
  .hero-container {
    height: 480px;
  }

  .hero-content {
    left: 80px;            /* Rykker teksten længere mod venstre på desktop */
    top: 50%;
    transform: translateY(-50%);
    max-width: 600px;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content button {
    padding: 14px 32px;
    font-size: 1.05rem;
  }
}

/* ============ LARGE DESKTOP (min-width: 1200px) ============ */
@media (min-width: 1200px) {
  .hero-content {
    left: calc((100vw - 1100px) / 2); 
    /* Matcher centrering fra din prototype, men stadig venstrestillet */
  }
}
</style>

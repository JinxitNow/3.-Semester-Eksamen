<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

function img(path) {
  return new URL(`../assets/img/${path}`, import.meta.url).href;
}

const images = [
  img("hero1.jpg"),
  img("hero2.webp"),
  img("hero3.webp"),
  img("hero7.webp"),
  img("hero5.webp"),
  img("julemarked.jpeg"),
];

const currentIndex = ref(0);
let interval;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 5000); // skifter hvert 5. sekund
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="hero-wrapper">
    <!-- Slideshow i fuld bredde -->
    <div class="slideshow">
      <transition name="fade">
        <img
          :src="images[currentIndex]"
          :key="images[currentIndex]"
          class="slide-image"
          alt="slideshow image"
        />
      </transition>
    </div>

    <!-- Overlay i fuld bredde -->
    <div class="hero-overlay"></div>

    <!-- Indhold med korrekt padding -->
    <div class="hero-container">
      <div class="hero-content">
        <h1>UNG I ODEON</h1>
        <a href="#event-feed" class="hero-button">SE UDVALGTE EVENTS</a>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Wrapper der sikrer fuld bredde baggrund */
.hero-wrapper {
  position: relative;
  width: 100vw;
  margin-left: -3.8rem;
  margin-right: -3.8rem;
  padding-left: 3.8rem;
  padding-right: 3.8rem;
  height: 420px;
  overflow: hidden;
}

/* Slideshow og overlay fylder hele wrapperen */
.slideshow,
.slide-image,
.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.25), /* højre side let lys */
    rgba(239, 239, 239, 0.87)  /* venstre side lidt kraftigere */
  );
  pointer-events: none;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s ease; /* blød overgang */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Indhold ligger ovenpå */
.hero-container {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
}

/* Hero-knap (mobile first) */
.hero-content .hero-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #927e47;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.hero-content .hero-button:hover {
  background-color: #a08b5d;
  transform: translateY(-2px);
}

.hero-content .hero-button:active {
  transform: translateY(0);
}

/* Tablet / desktop */
@media (min-width: 768px) {
  .hero-content .hero-button {
    padding: 14px 32px;
    }
}

@media (min-width: 1024px) {
  .hero-content .hero-button {
    padding: 16px 36px;
  }
}
</style>

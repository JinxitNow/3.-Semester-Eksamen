<script setup>
import { ref } from 'vue'

const headerOpen = ref(false)

function toggleHeader() {
  headerOpen.value = !headerOpen.value
}
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">· Musik · Events · Oplevelser</p>

      <div class="footer-socials">
        <img src="/src/assets/icons/facebook.png" alt="Social ikon" class="social-icon" />
        <img src="/src/assets/icons/instagram.png" alt="Social ikon" class="social-icon"/>
      </div>

      <p class="footer-copy">
        © {{ new Date().getFullYear() }} ODEON Odense
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #EFEFEF;
  color: #e8e6d3;
  padding: 2rem 1rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.footer-text {
  font-size: 1rem;
  color: #84754e;
  margin: 0;
}

.footer-socials {
  margin: 0.5rem 0;
}

.social-icon {
  width: 100px;
  height: 50px;
  object-fit: contain;
}

.footer-copy {
  font-size: 0.7rem;
  color: #84754e;
  margin: 0;
}
</style>

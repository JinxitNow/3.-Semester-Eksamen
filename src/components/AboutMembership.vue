<template>
  <div class="membership-wrapper">
    <section class="membership-section">
      <div class="text-column">
        <h2>Bliv en del af Ung i Odeon</h2>
        <p class="intro">
          Er du mellem 18 og 35 år? Så kan du gratis blive medlem af Ung i Odeon – et fællesskab for unge, hvor du får adgang til særlige fordele og oplevelser.
        </p>
        <ul class="benefits">
          <li>Gratis medlemskab – ingen skjulte gebyrer</li>
          <li>Eksklusive rabatter på udvalgte shows og arrangementer</li>
          <li>10 % rabat på menuer i Odeons café</li>
          <li>Tilbud fra Odeons samarbejdspartnere</li>
          <li>Aktiviteter og events for alle medlemmer</li>
          <li>Gratis arrangementer for forældre</li>
        </ul>
        <button @click="$emit('signup')">TILMELD DIG NU</button>
      </div>

      <div class="image-column">
         <img :src="myImage" alt="Café Odeon" />
      </div>
    </section>
  </div>
</template>

<script setup>
import myImage from '../assets/img/ungiodeon.webp'
</script>

<style scoped>
.membership-wrapper {
  background: #E4E3E1;
  width: 100vw;
  margin-left: -3.8rem;
  margin-right: -3.8rem;
  padding: 3.8rem;
  box-sizing: border-box;
}

.membership-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 2rem;
  min-height: 100vh;
}

.text-column {
  color: #796535;
  max-width: 600px;
  padding-right: 1.8rem;
}

h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.intro {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.benefits {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.benefits li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

button {
  padding: .7rem 1.4rem;
  background: #796535;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.image-column {
  width: 100%;
}

.image-column img {
  width: 100%;
  object-fit: cover;
  display: block;
  aspect-ratio: 2 / 1;
  border-radius: 6px;
}

/* Desktop layout */
@media (min-width: 900px) {
  .membership-section {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    padding-block: 4rem;
  }

  .image-column {
    max-width: 600px;
  }
}
</style>

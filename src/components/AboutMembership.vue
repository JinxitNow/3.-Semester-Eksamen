<script setup>
import myImage from '../assets/img/ungiodeon.webp'
</script>

<template>
  <div class="membership-wrapper">
    <section class="membership-section">
      <div class="text-column">
        <div class="text-content">
          <h2>Bliv en del af <i>Ung i ODEON</i></h2>

          <!-- MOBILBILLEDE -->
          <div class="mobile-image">
            <div class="image-wrapper">
              <img :src="myImage" alt="Ung i Odeon" />
            </div>
          </div>

          <p class="intro">
            Er du mellem 18 og 35 år? Så kan du gratis blive medlem af Ung i ODEON – et fællesskab for unge, hvor du får adgang til særlige fordele og oplevelser.
          </p>

          <h3 class="subheading">Det får du som medlem:</h3>
          <ul class="benefits">
            <li><strong>- Gratis medlemskab</strong> – ingen skjulte gebyrer</li>
            <li><strong>- Rabatter</strong> på udvalgte shows og arrangementer</li>
            <li><strong>- 10 % rabat</strong> på menuer i ODEON café</li>
            <li><strong>- Tilbud</strong> fra ODEONs samarbejdspartnere</li>
            <li><strong>- Events</strong> og aktiviteter for alle medlemmer</li>
            <li><strong>- Gratis arrangementer</strong> for forældre</li>
          </ul>

          <div class="button-wrapper">
            <button @click="$emit('signup')">TILMELD DIG NU</button>
          </div>
        </div>
      </div>

      <!-- DESKTOPBILLEDE -->
      <div class="image-column">
        <div class="image-wrapper">
          <img :src="myImage" alt="Ung i Odeon" />
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
/* === WRAPPER === */
.membership-wrapper {
  background: #E4E3E1;
  width: 100vw;
  margin-left: -3.8rem;
  margin-right: -3.8rem;
  padding: 2.5rem;
  box-sizing: border-box;
}

/* === LAYOUT === */
.membership-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-block: 1.5rem;
}

.text-column {
  padding: 0 1.5rem;
  color: #927e47;
}

.text-content {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* === TYPOGRAFI === */
/* === TYPOGRAFI === */
h2 {
  font-size: 22px;       /* global størrelse */
  font-weight: 700;
  color: #796535;        /* samme farve som resten */
  margin-bottom: 0.5rem; /* lidt luft til intro */
}

.intro {
  font-size: 16px;       /* global brødtekst størrelse */
  line-height: 1.6;
  color: #796535;
}

.subheading {
  font-size: 1.1rem;
  font-weight: 600;
  color: #796535;
}

.benefits {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 16px;
  line-height: 1.5;
  color: #796535;
}


/* === KNAP === */
.button-wrapper {
  margin-top: 0.8rem;
}

button {
  padding: 0.8rem 1.6rem;
  background: #867541;
  color: white;
  border-radius: 6px;
  font-weight: 300;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #5f512a;
}

/* === BILLEDE === */
.image-column {
  display: none; /* skjul desktop-billedet på mobil */
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
 }

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-image {
  display: block;
}

/* Kun mobil: begræns højden til ca. 200px */
@media (max-width: 899px) {
  .mobile-image .image-wrapper {
    max-height: 200px;
    height: 200px; /* fast højde */
  }
}

/* === DESKTOP === */
@media (min-width: 900px) {
  .membership-section {
    flex-direction: row;
    align-items: stretch; /* tekst og billede samme højde */
    justify-content: space-between;
    gap: 2rem;
    padding-block: 1.5rem;
    min-height: 350px;
    padding-right: 1.8rem;
    padding-left: 1.8rem;
  }

  .text-column {
    flex: 1;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .text-content {
    margin: 0;
  }

  .image-column {
    display: block;
    flex: 1; /* billede fylder samme som tekst */
    max-width: none;
  }

  .image-wrapper {
    height: 100%;
    aspect-ratio: auto;
  }

  .image-wrapper img {
    height: 100%;
    object-fit: cover;
  }

  .mobile-image {
    display: none; /* skjul mobilbilledet på desktop */
  }
}
</style>

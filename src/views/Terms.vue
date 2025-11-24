<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goHome = () => {
  router.push("/");
};

const scrollTo = (id) => {
  const container = document.querySelector(".terms-content");
  const target = document.getElementById(id);

  if (container && target) {
    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const scrollOffset = targetTop - containerTop + container.scrollTop;

    container.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
  }
};
</script>

<template>
  <div class="terms-layout">
    <!-- Indholdsfortegnelse inkl. tilbage-knap -->
    <nav class="terms-nav">
      <div class="back-button">
        <button @click="goHome">← Tilbage til forsiden</button>
      </div>

      <h3>Indhold</h3>
      <ul>
        <li><a href="#generelle" @click.prevent="scrollTo('generelle')">1. Generelle oplysninger</a></li>
        <li><a href="#alder" @click.prevent="scrollTo('alder')">2. Alderskrav</a></li>
        <li><a href="#fordele" @click.prevent="scrollTo('fordele')">3. Medlemsfordele</a></li>
        <li><a href="#nyhedsbrev" @click.prevent="scrollTo('nyhedsbrev')">4. Nyhedsbrev</a></li>
        <li><a href="#betaling" @click.prevent="scrollTo('betaling')">5. Betaling og refundering</a></li>
        <li><a href="#ansvar" @click.prevent="scrollTo('ansvar')">6. Ansvar</a></li>
        <li><a href="#ændringer" @click.prevent="scrollTo('ændringer')">7. Ændringer</a></li>
      </ul>
    </nav>

    <!-- Handelsbetingelser -->
    <div class="terms-content">
      <h1>Handelsbetingelser for UNG I ODEON</h1>

      <section id="generelle">
        <h3>1. Generelle oplysninger</h3>
        <p>
          Ved tilmelding til UNG I ODEON bliver du medlem af klubben. Medlemskabet er gratis og giver adgang til særlige fordele og rabatter.
        </p>
      </section>

      <section id="alder">
        <h3>2. Alderskrav</h3>
        <p>
          Medlemskab er for unge mellem 18 og 35 år. Du skal være inden for denne aldersgruppe for at kunne benytte dig af fordelene.
        </p>
      </section>

      <section id="fordele">
        <h3>3. Medlemsfordele</h3>
        <p>
          Som medlem får du adgang til eksklusive rabatter på udvalgte shows, cafébesøg i forbindelse med shows, og andre events hos ODEON, der er målrettet unge.
        </p>
        <p>
          Derudover kan du modtage rabatter hos ODEONs samarbejdspartnere. Rabatter gælder kun på udvalgte produkter og ydelser.
        </p>
      </section>

      <section id="nyhedsbrev">
        <h3>4. Nyhedsbrev</h3>
        <p>
          Som medlem har du mulighed for at tilmelde dig vores nyhedsbrev. Her modtager du information om kommende events, særlige rabatter samt artikler relateret til UNG I ODEON.
        </p>
      </section>

      <section id="betaling">
        <h3>5. Betaling og refundering</h3>
        <p>
          Rabatter gives kun på udvalgte produkter og ydelser. Vi tilbagebetaler ikke køb foretaget med UNG‑rabatten, herunder cafévarer, drikkevarer eller produkter købt hos samarbejdspartnere.
        </p>
      </section>

      <section id="ansvar">
        <h3>6. Ansvar</h3>
        <p>
          ODEON kan ikke holdes ansvarlig for tab eller skader, der måtte opstå i forbindelse med brug af rabatter eller deltagelse i arrangementer, medmindre andet følger af ufravigelig lovgivning.
        </p>
      </section>

      <section id="ændringer">
        <h3>7. Ændringer</h3>
        <p>
          ODEON forbeholder sig retten til at ændre handelsbetingelserne. Den nyeste version vil altid være tilgængelig på hjemmesiden.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  scroll-behavior: smooth;
}

.terms-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.terms-nav {
  width: 28%;
  padding: 2rem;
  border-right: 1px solid #c4b89e;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background: #efefef;
}

.back-button {
  margin-bottom: 1.5rem;
}

.back-button button {
  width: 100%;
  text-align: left;
  background-color: #947e4a;
  color: #fbfbfb;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button button:hover {
  background-color: #7d6a3e;
}

.terms-content {
  width: 72%;
  padding: 2rem;
  overflow-y: auto;
  height: 100vh;
}
.terms-content h1 {
  margin-bottom: 2rem;
  font-size: 24px;   /* lidt mindre end før */
  font-weight: 700;
  color: #796535;
}

.terms-content h3 {
  font-size: 16px;   /* mindre og mere diskret */
  font-weight: 600;
  margin-bottom: 0.6rem;
  margin-top: 2rem;
  color: #796535;
}

.terms-content p {
  margin-bottom: 1rem;
  max-width: 700px;
  line-height: 1.6;
  font-size: 14px;   /* mindre brødtekst for bedre læsbarhed */
}


.terms-nav h3 {
  margin-bottom: 1rem;
  font-size: 18px;
  font-weight: 600;
  color: #796535;
}

.terms-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 2px solid #c4b89e;
}

.terms-nav li {
  margin-bottom: 1rem;
  padding-left: 1rem;
}

.terms-nav a {
  color: #796535;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s ease;
  display: block;
}

.terms-nav a:hover {
  color: #947e4a;
  text-decoration: underline;
}
</style>
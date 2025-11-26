<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import LoginShortcuts from '../components/LoginShortcuts.vue';

const router = useRouter();
function goTo(path) {
  router.push(path);
}

// FAQ toggle state
const activeFaq = ref(null);
function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}

const faqs = [
  {
    question: "Hvordan fungerer kampagnesiden 'Ung i ODEON'?",
    answer: "Kampagnesiden er designet til at fremhæve udvalgte events og indhold for unge brugere. Den fungerer som en slags forside, hvor man hurtigt kan få et overblik over de mest relevante aktiviteter. Alt indhold hentes fra events og præsenteres i et simpelt layout, så det er let at navigere. For mere information se Kampagneside‑tutorial."
  },
  {
    question: "Hvordan administrerer jeg medlemmer?",
    answer: "Medlemslisten giver dig mulighed for at se alle registrerede brugere i systemet. Du kan opdatere deres oplysninger, fx navn eller adresse, og du kan slette medlemmer, hvis de ikke længere skal være en del af databasen. Det er en central funktion for at holde medlemsdata ajour. For mere information se Medlemsliste‑tutorial."
  },
  {
    question: "Hvordan opretter og håndterer jeg events?",
    answer: "Events oprettes ved at udfylde titel, dato, tid, billede og kategori. Når et event er oprettet, kan du til enhver tid redigere det, fx ændre dato eller billede, eller slette det helt. Det giver dig fuld kontrol over hvilke aktiviteter der vises til brugerne. For mere information se Events‑tutorial."
  },
  {
    question: "Hvad viser statistiksiden?",
    answer: "Statistiksiden giver dig som admin et hurtigt overblik over udviklingen i systemet. For mere information se Statistik‑tutorial."
  },
  {
    question: "Hvordan sikrer jeg mig at ændringer bliver gemt?",
    answer: "Når du opretter eller redigerer indhold (fx events eller medlemmer), skal du altid afslutte med at trykke 'Gem'. Hvis du forlader siden uden at gemme, vil dine ændringer gå tabt. Det er derfor en god vane at gemme løbende, især hvis du laver flere ændringer i træk. For mere information se den relevante tutorial."
  }
];

onMounted(() => {
  document.body.classList.add("dashboard-active");
});
onUnmounted(() => {
  document.body.classList.remove("dashboard-active");
});
</script>



<template>
  <section class="dashboard-page">
    <div class="dashboard-header">
      <LoginShortcuts />
      <div class="dashboard-heading">
        <h2>Produktmanual & Tutorials</h2>
        <p class="dashboard-subtitle">Sidste opdatering: 27.11.2025</p>
      </div>
    </div>

    <p class="manual-description">
      Er du usikker på noget? Se vores forskellige brugsvejledninger, hvor du får en introduktion til produktet samt en step-by-step-guide til, hvordan man opretter og opdaterer events eller medlemmer — og hvordan kampagnesiden “Ung i ODEON” er opbygget. På siderne finder du også videoguides, der hjælper dig trin for trin.
    </p>

    <div class="manual-buttons">
      <button class="primary-btn" @click="goTo('/tutorial/campaign')">Kampagnesiden</button>
      <button class="primary-btn" @click="goTo('/tutorial/members')">Medlemsliste</button>
      <button class="primary-btn" @click="goTo('/tutorial/events')">Events</button>
      <button class="primary-btn" @click="goTo('/tutorial/statistics')">Statistikker</button>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h3>FAQ</h3>
      <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
        <button class="faq-toggle" @click="toggleFaq(index)">
          <span class="faq-question-text">{{ faq.question }}</span>
          <span class="faq-arrow" :class="{ open: activeFaq === index }">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5" fill="none" stroke="#947e4a" stroke-width="2"/>
            </svg>
          </span>
        </button>
        <div v-if="activeFaq === index" class="faq-answer">
          {{ faq.answer }}
        </div>
        <div class="faq-divider"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
body.dashboard-active {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.dashboard-page {
  margin-left: 240px;
  padding: 2rem;
  background-color: #EFEFEF;
}

.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.dashboard-heading h2 {
  font-size: 22px;
  color: #796535;
  margin: 0;
}

.dashboard-subtitle {
  font-size: 0.95rem;
  color: #796535;
  margin-top: 0.5rem;
}

.manual-description {
  font-size: 16px;
  color: #796535;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.manual-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.primary-btn {
  width: 100%;
  padding: 1.2rem 0;
  background-color: #867541;
  color: #FBFBFB;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 400;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.1s ease;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.primary-btn:hover {
  background-color: #7d6a3e;
}

.faq-section {
  margin-top: 3rem;
}

.faq-section h3 {
  font-size: 1.4rem;
  color: #796535;
  margin-bottom: 0.8rem;
}

.faq-item {
  margin-bottom: 0.5rem;
}

.faq-toggle {
  background: none;
  border: none;
  width: 100%;
  padding: 0.6rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question-text {
  font-size: 1.05rem;
  font-weight: 500;
  color: #947e4a;
}

.faq-arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.faq-arrow.open {
  transform: rotate(180deg);
}

.faq-answer {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  font-weight: 400;
  color: #796535;
  line-height: 1.5;
  padding-left: 0.2rem;
  padding-bottom: 0.8rem;
}

.faq-divider {
  height: 1px;
  background-color: #947e4a;
  opacity: 0.3;
}

@media (max-width: 1024px) {
  .dashboard-header {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .dashboard-heading {
    text-align: center;
  }
  .manual-buttons {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    margin-left: 0;
    padding: 1rem;
  }
  .manual-buttons {
    grid-template-columns: 1fr;
  }
}
</style>

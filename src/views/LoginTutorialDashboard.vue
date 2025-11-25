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
      <button class="primary-btn" @click="goTo('/tutorial/events')">Events</button>
      <button class="primary-btn" @click="goTo('/tutorial/members')">Medlemmer</button>
      <button class="primary-btn" @click="goTo('/tutorial/campaign')">Kampagnesiden</button>
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

<script>
const activeFaq = ref(null);
function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}

const faqs = [
  {
    question: "Mega godt simpel og generel spørgsmål?",
    answer: "Mega godt og generlle svar, der hjælper brugeren med ikke helt så meget andet end den generelle forståelse."
  },
  {
    question: "Mega godt simpel og generel spørgsmål?",
    answer: "Mega godt og generlle svar, der hjælper brugeren med ikke helt så meget andet end den generelle forståelse."
  },
  {
    question: "Mega godt simpel og generel spørgsmål?",
    answer: "Mega godt og generlle svar, der hjælper brugeren med ikke helt så meget andet end den generelle forståelse."
  },
  {
    question: "Mega godt simpel og generel spørgsmål?",
    answer: "Mega godt og generlle svar, der hjælper brugeren med ikke helt så meget andet end den generelle forståelse."
  },
  {
    question: "Mega godt simpel og generel spørgsmål?",
    answer: "Mega godt og generlle svar, der hjælper brugeren med ikke helt så meget andet end den generelle forståelse."
  }
];

</script>
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

/* Header */
.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.dashboard-heading h2 {
  font-size: 22px; /* global størrelse */
  color: #796535;
  margin: 0;
}

.dashboard-subtitle {
  font-size: 0.95rem;
  color: #796535;
  margin-top: 0.5rem;
}

/* Manual text */
.manual-description {
  font-size: 16px; /* global brødtekst størrelse */
  color: #796535;
  line-height: 1.6;
  margin-bottom: 2.5rem; /* lidt mere luft ned til knapper */
}

/* Buttons */
.manual-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 knapper fordelt ligeligt */
  gap: 1.5rem; 
  margin-bottom: 4rem; /* mere luft ned til FAQ */
}

.primary-btn {
  width: 100%;              /* knappen fylder hele sin kolonne */
  padding: 1.2rem 0;        /* højere knapper */
  background-color: #947e4a;
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

/* FAQ */
.faq-section {
  margin-top: 3rem;
}

.faq-section h3 {
  font-size: 1.4rem;
  color: #796535;
  margin-bottom: 0.8rem; /* tættere på spørgsmålene */
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
  font-weight: 500; /* ikke for tyk */
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
  transform: rotate(180deg); /* roter pilen op når åbnet */
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

/* Responsiv */
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
    grid-template-columns: 1fr 1fr; /* 2 per række på tablet */
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    margin-left: 0;
    padding: 1rem;
  }

  .manual-buttons {
    grid-template-columns: 1fr; /* én per række på mobil */
  }
}
</style>

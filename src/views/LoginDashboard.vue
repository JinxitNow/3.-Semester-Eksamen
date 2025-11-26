<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import LoginShortcuts from '../components/LoginShortcuts.vue'

const router = useRouter();
function goTo(path) {
  router.push(path);
}

// Tilføj en klasse til <body> når dashboardet er aktivt
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
        <h2>Velkommen til Admin Dashboard</h2>
        <p class="dashboard-subtitle">Sidste opdatering: 27.11.2025</p>
      </div>
    </div>

 <div class="dashboard-grid">
  <div class="column">
    <h3>Medlemsliste</h3>
    <p>Administrer medlemmer: se, opdater, tilføj eller slet</p>
    <button class="primary-btn" @click="goTo('/medlem')">Gå til Medlemsliste</button>
  </div>

  <div class="column">
    <h3>Events</h3>
    <p>Se på, opret, opdater eller slet events</p>
    <button class="primary-btn" @click="goTo('/login-event')">Gå til Events</button>
  </div>

  <div class="column">
    <h3>Statistikker</h3>
    <p>Se på statistikker</p>
    <!-- Denne route findes ikke endnu -->
    <button class="primary-btn" @click="goTo('/statistik')">Gå til Statistikker</button>
  </div>

  <div class="column">
    <h3>Produktmanual</h3>
    <p>Se på hvordan du kan bruge kampagne- og login-siden</p>
    <button class="primary-btn" @click="goTo('/tutorials')">Gå til Manual</button>
  </div>
</div>

  </section>
</template>

<style scoped>
/* Overskriv global body padding når dashboard er aktivt */
body.dashboard-active {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.dashboard-page {
  margin-left: 240px;          /* plads til sidebar */
  padding: 2rem;
  background-color: #EFEFEF;   /* grå baggrund fylder hele bredden */
}

/* Header */
.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.dashboard-heading h2 {
  font-size: 1.8rem;
  color: #796535; /* global farve */
  margin: 0;
}

.dashboard-subtitle {
  font-size: 0.95rem;
  color: #796535; /* global farve */
  margin-top: 0.5rem;
}

/* Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.column {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.8rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 260px;
  text-align: left;
}

.column h3 {
  margin-bottom: 1rem;
  color: #796535; /* global farve */
  font-size: 1.1rem;
}

.column p {
  font-size: 0.9rem;
  color: #796535; /* global farve */
  line-height: 1.5;
  flex-grow: 1;
}

/* Knapper */
.primary-btn {
  padding: 0.7rem 1.5rem;
  background-color: #867541; /* global button farve */
  color: #FBFBFB;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 300;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.1s ease;
  align-self: flex-start;
  min-width: 180px;
}

.primary-btn:hover {
  background-color: #7d6a3e; /* global hover farve */
}

/* Responsiv */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .dashboard-heading {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    margin-left: 0;
    padding: 1rem;
  }
}
</style>

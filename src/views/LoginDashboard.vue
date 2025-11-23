<script setup>
import { useRouter } from "vue-router";
import LoginShortcuts from '../components/LoginShortcuts.vue'

const router = useRouter();

function goTo(path) {
  router.push(path);
}
</script>

<template>
  <LoginShortcuts /> 
  <section class="dashboard-page">
    <h2 class="dashboard-title">Dashboard</h2>
    <div class="dashboard-grid">

      <!-- Kolonne 2: Opret Events -->
      <div class="column">
        <h3>Opret Events</h3>
        <p>Her kan du oprette og administrere events.</p>
        <button class="primary-btn" @click="goTo('/login-event')">Gå til Eventoprettelse</button>
      </div>

      <!-- Kolonne 3: Medlemsskaber -->
      <div class="column">
        <h3>Se Medlemsskaber</h3>
        <p>Få overblik over medlemsoplysninger.</p>
        <button class="primary-btn" @click="goTo('/medlems')">Gå til Medlemsskab</button>
      </div>

      <!-- Kolonne 4: Vejledninger -->
      <div class="column">
        <h3>Vejledninger & Tutorials</h3>
        <p>Læs brugervejledninger og se tutorials.</p>
        <button class="primary-btn" @click="goTo('/vejledninger')">Gå til Vejledninger</button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.dashboard-page {
  margin-left: 240px;   /* plads til sidebar på desktop */
  padding: 2rem;
  background-color: #E4E3E1;
}

.dashboard-title {
  text-align: center;
  font-size: 1.8rem;
  color: #84754e;
  margin-bottom: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.column {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.column h3 {
  margin-bottom: 1rem;
  color: #84754e;
}

.column p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
}

/* Genveje */
.link-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-btn {
  padding: 0.6rem;
  background-color: #84754e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.link-btn:hover {
  background-color: #a49364;
}

/* Primære knapper */
.primary-btn {
  padding: 0.6rem 1rem;
  background-color: #84754e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.primary-btn:hover {
  background-color: #a49364;
}

/* Responsiv */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    margin-left: 0;   /* fjern sidebar-margin på mobil */
    padding: 1rem;    /* lidt mindre padding */
  }
}
</style>

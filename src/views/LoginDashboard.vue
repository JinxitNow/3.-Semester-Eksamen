<script setup>
// Ingen data eller Firebase – kun navigation
import { useRouter } from "vue-router";

const router = useRouter();

function goTo(path) {
  router.push(path);
}
</script>

<template>
  <section class="dashboard-page">
    <h2 class="dashboard-title">Dashboard</h2>
    <div class="dashboard-grid">
      
      <!-- Boks 1: Eventoprettelse -->
      <div class="dashboard-box" @click="goTo('/login-event')">
        <h3>Opret Event</h3>
        <p>Opret og administrer dine events.</p>
      </div>

      <!-- Boks 2: Medlemskab -->
      <div class="dashboard-box" @click="goTo('/medlems')">
        <h3>Medlemskab</h3>
        <p>Se og opdater dine medlemsoplysninger.</p>
      </div>

      <!-- Boks 3: Vejledninger -->
      <div class="dashboard-box" @click="goTo('/vejledninger')">
        <h3>Brugervejledninger</h3>
        <p>Få hjælp og tutorials til systemet.</p>
      </div>

      <!-- Boks 4: Indstillinger -->
      <div class="dashboard-box" @click="goTo('/indstillinger')">
        <h3>Indstillinger</h3>
        <p>Tilpas dine præferencer.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.dashboard-page {
  padding: 2rem;
}

.dashboard-title {
  text-align: center;
  font-size: 1.8rem;
  color: #84754e;
  margin-bottom: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.dashboard-box {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  border: 1px solid #ddd;
}

.dashboard-box h3 {
  margin: 0 0 0.5rem 0;
  color: #84754e;
}

.dashboard-box p {
  font-size: 0.9rem;
  color: #555;
}

.dashboard-box:hover {
  transform: translateY(-4px);
  background-color: #eaeaea;
}
</style>

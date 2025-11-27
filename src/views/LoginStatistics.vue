<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { database } from "../firebase";
import { ref as dbRef, onValue } from "firebase/database";
import LoginShortcuts from "../components/LoginShortcuts.vue";

// State
const members = ref([]);
const events = ref([]);

// Hent medlemmer og events fra Firebase
onMounted(() => {
  document.body.classList.add("dashboard-active");

  const membersRef = dbRef(database, "members");
  onValue(membersRef, snapshot => {
    const data = snapshot.val() || {};
    members.value = Object.values(data);
  });

  const eventsRef = dbRef(database, "events");
  onValue(eventsRef, snapshot => {
    const data = snapshot.val() || {};
    events.value = Object.values(data);
  });
});

onUnmounted(() => {
  document.body.classList.remove("dashboard-active");
});

// Statistikker
const totalMembers = computed(() => members.value.length);

const membersThisMonth = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return members.value.filter(m => {
    if (!m.createdAt) return false;
    const created = new Date(m.createdAt);
    return (
      created.getMonth() === currentMonth &&
      created.getFullYear() === currentYear
    );
  }).length;
});

const ageDistribution = computed(() => {
  const dist = { "18-24":0, "25-30":0, "31-35":0 };
  members.value.forEach(m => {
    if (!m.birthday) return;
    const birthYear = new Date(m.birthday).getFullYear();
    const age = new Date().getFullYear() - birthYear;
    if (age >= 18 && age <= 24) dist["18-24"]++;
    else if (age >= 25 && age <= 30) dist["25-30"]++;
    else if (age >= 31 && age <= 35) dist["31-35"]++;
  });
  return dist;
});

const geoTop = computed(() => {
  const counts = {};
  members.value.forEach(m => {
    if (!m.address2) return;
    counts[m.address2] = (counts[m.address2] || 0) + 1;
  });
  return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,3);
});

const activeEvents = computed(() => {
  const now = new Date();
  return events.value.filter(e => new Date(e.date) >= now).length;
});

const expiredEvents = computed(() => {
  const now = new Date();
  return events.value.filter(e => new Date(e.date) < now).length;
});

const topEvents = computed(() => {
  return [...events.value]
    .sort((a,b) => (b.favorites?.length||0) - (a.favorites?.length||0))
    .slice(0,3);
});

const topCategories = computed(() => {
  const counts = {};
  events.value.forEach(e => {
    e.categories?.forEach(c => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });
  return Object.entries(counts).sort((a,b) => b[1]-a[1]);
});
</script>

<template>
  <section class="dashboard-page">
    <div class="dashboard-header">
      <LoginShortcuts />
      <div class="dashboard-heading">
        <h2>Statistikker</h2>
        <p class="dashboard-subtitle">Sidste opdatering: 27.11.2025</p>
      </div>
    </div>

    <div class="stats-grid">
      <!-- Medlemsstatistikker -->
      <div class="stats-column">
        <h3>👥 Medlemsstatistikker:</h3>
        <div class="stat-item">
          <span class="label">Antal medlemmer:</span>
          <span class="value">{{ totalMembers }}</span>
        </div>
        <div class="stat-item">
          <span class="label">Nye denne måned:</span>
          <span class="value">{{ membersThisMonth }}</span>
        </div>
        <div class="stat-item">
          <span class="label">Aldersfordeling:</span>
          <ul class="sub-list">
            <li>18-24: {{ ageDistribution["18-24"] }}</li>
            <li>25-30: {{ ageDistribution["25-30"] }}</li>
            <li>31-35: {{ ageDistribution["31-35"] }}</li>
          </ul>
        </div>
        <div class="stat-item">
          <span class="label">Top geografi:</span>
          <ul class="sub-list">
            <li v-for="[place,count] in geoTop" :key="place">{{ place }}: {{ count }}</li>
          </ul>
        </div>
      </div>

      <!-- Eventstatistikker -->
      <div class="stats-column">
        <h3>🎭 Eventstatistikker:</h3>
        <div class="stat-item">
          <span class="label">Aktive events:</span>
          <span class="value">{{ activeEvents }}</span>
        </div>
        <div class="stat-item">
          <span class="label">Overskredne events:</span>
          <span class="value">{{ expiredEvents }}</span>
        </div>
      <div class="stat-item">
  <span class="label">Eventkategorier (antal oprettede):</span>
  <ul class="sub-list">
    <li v-for="[cat,count] in topCategories" :key="cat">{{ cat }}: {{ count }}</li>
  </ul>
</div>

      </div>
    </div>
  </section>
</template>
<style scoped>
.dashboard-page {
  padding: 1rem;
  background-color: #EFEFEF;
}

/* Header */
.dashboard-header {
  display: flex;
  flex-direction: column; /* mobil: stack */
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-heading h2 {
  font-size: 1.4rem; /* lidt mindre på mobil */
  color: #796535;
  margin: 0;
}

.dashboard-subtitle {
  font-size: 0.85rem;
  color: #796535;
  margin-top: 0.3rem;
}

/* Grid – mobil først: én kolonne */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stats-column {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.stats-column h3 {
  margin-bottom: 1rem;
  color: #796535;
  font-size: 1.1rem;
  border-bottom: 2px solid #e3d7b6;
  padding-bottom: 0.3rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.8rem;
}

.label {
  font-size: 0.9rem;
  color: #796535;
  font-weight: 500;
}

.value {
  font-size: 1rem;
  font-weight: 600;
  color: #867541;
}

.sub-list li {
  font-size: 0.85rem;
  color: #4B4B4B;
  margin-bottom: 0.2rem;
}

/* Tablet og op */
@media (min-width: 768px) {
  .dashboard-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

/* Desktop og op */
@media (min-width: 1200px) {
  .dashboard-page {
    margin-left: 240px; /* først her får vi sidebar spacing */
    padding: 2rem;
  }

  .dashboard-heading h2 {
    font-size: 1.8rem;
  }
}
</style>

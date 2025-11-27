<script setup>
import { RouterLink } from "vue-router";
import { onMounted, onUnmounted } from "vue";
import LoginShortcuts from '../components/LoginShortcuts.vue';

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "Sidste opdatering: 27.11.2025" },
  steps: { type: Array, required: true },
  prevRoute: { type: String, default: null },
  nextRoute: { type: String, default: null }
});

onMounted(() => {
  document.body.classList.add("tutorial-active");
});
onUnmounted(() => {
  document.body.classList.remove("tutorial-active");
});
</script>

<template>
  <section class="tutorial-page">
    <div class="tutorial-header">
      <LoginShortcuts />
      <div class="tutorial-heading">
        <h2>{{ title }}</h2>
        <p class="tutorial-subtitle">{{ subtitle }}</p>
      </div>
    </div>

    <div class="tutorial-section">
      <div class="tutorial-block" v-for="(step, index) in steps" :key="index">
        <h3>{{ step.title }}</h3>
        <div class="tutorial-item" v-for="(item, i) in step.items" :key="i">
          <div class="tutorial-text">
            <p>{{ item.text }}</p>
          </div>
          <div class="tutorial-image">
            <img :src="item.image" :alt="step.title + ' ' + (i+1)" />
          </div>
        </div>
      </div>
    </div>

    <!-- Knapper nederst -->
    <div class="tutorial-actions">
      <RouterLink v-if="prevRoute" :to="prevRoute" class="tutorial-btn">← Tilbage</RouterLink>
      <RouterLink v-if="nextRoute" :to="nextRoute" class="tutorial-btn primary">Næste →</RouterLink>
    </div>

  </section>
</template>

<style scoped>
.tutorial-page {
  margin-left: 240px;
  padding: 2rem;
  background-color: #EFEFEF;
}

.tutorial-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.tutorial-heading h2 {
  font-size: 22px;
  color: #796535;
  margin: 0;
}

.tutorial-subtitle {
  font-size: 0.95rem;
  color: #796535;
  margin-top: 0.5rem;
}

.tutorial-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.tutorial-block {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tutorial-block h3 {
  font-size: 1.2rem;
  color: #796535;
  margin-bottom: 0.5rem;
}

.tutorial-item {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.tutorial-text {
  flex: 1;
  min-width: 280px;
}

.tutorial-text p {
  font-size: 16px;
  color: #796535;
  line-height: 1.6;
}

.tutorial-image {
  width: 100%;
  max-width: 420px;   /* maks bredde */
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tutorial-image img {
  width: 100%;
  height: auto;        /* bevarer proportioner */
  object-fit: contain; /* hele billedet vises, ingen beskæring */
}


/* Responsiv */
@media (max-width: 1024px) {
  .tutorial-item {
    flex-direction: column;
    align-items: center;
  }

  .tutorial-image {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 768px) {
  .tutorial-page {
    margin-left: 0;
    padding: 1rem;
  }
}

/* Knapper nederst i layout */
.tutorial-actions {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-top: 3rem;
  width: 100%;
}

.tutorial-btn {
  padding: 12px 26px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #867541;
  background-color: transparent;
  color: #867541;
  cursor: pointer;
  transition: 0.25s ease;
  text-decoration: none;
  display: inline-block;
}

.tutorial-btn:hover {
  background-color: #e3d7b6;
}

.tutorial-btn.primary {
  background-color: #867541;
  border-color: #867541;
  color: white;
}

.tutorial-btn.primary:hover {
  background-color: #a08b5d;
}
</style>

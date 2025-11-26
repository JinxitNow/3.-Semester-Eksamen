<script setup>
import { ref } from "vue"

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    default: "Troubleshooting"
  }
})

const activeIndex = ref(null)

function toggle(index) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="troubleshooting-section">
    <h3>{{ title }}</h3>
    <div class="troubleshooting-item" v-for="(item, index) in items" :key="index">
      <button class="troubleshooting-toggle" @click="toggle(index)">
        <span class="troubleshooting-question">{{ item.question }}</span>
        <span class="troubleshooting-arrow" :class="{ open: activeIndex === index }">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5" fill="none" stroke="#947e4a" stroke-width="2"/>
          </svg>
        </span>
      </button>
      <div v-if="activeIndex === index" class="troubleshooting-answer">
        {{ item.answer }}
      </div>
      <div class="troubleshooting-divider"></div>
    </div>
  </div>
</template>

<style scoped>
.troubleshooting-section {
  margin-top: 3rem;
}

.troubleshooting-section h3 {
  font-size: 1.4rem;
  color: #796535;
  margin-bottom: 0.8rem;
}

.troubleshooting-item {
  margin-bottom: 0.5rem;
}

.troubleshooting-toggle {
  background: none;
  border: none;
  width: 100%;
  padding: 0.6rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.troubleshooting-question {
  font-size: 1.05rem;
  font-weight: 500;
  color: #947e4a;
}

.troubleshooting-arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.troubleshooting-arrow.open {
  transform: rotate(180deg);
}

.troubleshooting-answer {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  font-weight: 400;
  color: #796535;
  line-height: 1.5;
  padding-left: 0.2rem;
  padding-bottom: 0.8rem;
}

.troubleshooting-divider {
  height: 1px;
  background-color: #947e4a;
  opacity: 0.3;
}


/* Sådan sætter man den op: <script setup>
import Troubleshooting from '../components/Troubleshooting.vue'

const issues = [
  { question: "Hvordan opretter jeg et event?", answer: "Gå til Events og klik 'Opret nyt'." },
  { question: "Hvordan opdaterer jeg et medlem?", answer: "Find medlemmet i listen og klik 'Rediger'." }
]
</script>

<template>
  <Troubleshooting :items="issues" title="Troubleshooting" />
</template>
 */


</style>


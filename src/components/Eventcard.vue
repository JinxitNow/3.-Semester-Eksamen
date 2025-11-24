<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  event: { type: Object, required: true },
  hideFavorite: { type: Boolean, default: false },
  showCalendar: { type: Boolean, default: true }
});

const isFavorite = ref(false);

onMounted(() => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  isFavorite.value = savedFavorites.some(ev => ev.id === props.event.id);
});

watch(
  () => localStorage.getItem("favorites"),
  (newVal) => {
    const savedFavorites = JSON.parse(newVal) || [];
    isFavorite.value = savedFavorites.some(ev => ev.id === props.event.id);
  }
);

function toggleFavorite() {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (isFavorite.value) {
    const updated = savedFavorites.filter(ev => ev.id !== props.event.id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    isFavorite.value = false;
  } else {
    savedFavorites.push(props.event);
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    isFavorite.value = true;
  }
}

// ÅBN Reminder-siden med korrekt event-ID
function addToCalendar() {
  router.push({
    name: "Reminder",
    params: { id: props.event.id }
  });
}

// Helpers
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  return capitalize(formatted);
}
</script>


<template>
  <div class="event-card">
    <div class="image-wrapper">
      <img :src="`/img/${event.image}`" :alt="event.title" class="event-image" />

      <!-- FAVORIT -->
      <button
        v-if="!hideFavorite"
        class="favorite-btn"
        @click.stop="toggleFavorite"
      >
        {{ isFavorite ? "❤️" : "🤍" }}
      </button>

      <!-- KALENDER -->
      <button
        v-if="showCalendar"
        class="calendar-btn"
        @click.stop="addToCalendar"
      >
        📅
      </button>
    </div>

    <div class="event-info">
      <div class="event-main">
        <p class="event-date">{{ formatDate(event.date) }}</p>
        <h3 class="event-title">{{ event.title }}</h3>
      </div>

      <!-- ⭐ KUN denne badge vises -->
      <div 
        v-if="event.specialLabel && event.specialLabel.includes('Ung i ODEON rabat')" 
        class="special-label"
      >
        Ung i ODEON rabat
      </div>
    </div>
  </div>
</template>


<style scoped>
.event-card {
  padding: 1.7rem;
  text-align: left;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 1024px) {
  .event-card {
    padding: 1rem;
    min-height: 320px;
  }
}

.image-wrapper {
  position: relative;
}

.event-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #84754e;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.calendar-btn {
  position: absolute;
  top: 8px;
  right: 56px;
  z-index: 10;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #84754e;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-btn:hover {
  transform: scale(1.2);
}

.event-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1rem;
}

.event-main {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  flex: 1;
}

.event-title {
  font-size: 1.2rem;
  color: #84754e;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 0.9rem;
  color: #84754e;
  margin: 0;
}

.special-label {
  background-color: #84754e;
  color: white;
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  height: auto;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
}
</style>

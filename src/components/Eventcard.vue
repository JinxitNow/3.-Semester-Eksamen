<script setup>
import { ref, onMounted, watch } from "vue";

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

function addToCalendar() {
  alert(`Tilføj event: ${props.event.title} den ${props.event.date}`);
}
</script>

<template>
  <div class="event-card">
    <div class="image-wrapper">
      <img :src="`/img/${event.image}`" :alt="event.title" class="event-image" />

      <!-- Hjerte -->
      <button
        v-if="!hideFavorite"
        class="favorite-btn"
        @click.stop="toggleFavorite"
      >
        {{ isFavorite ? "❤️" : "🤍" }}
      </button>

      <!-- Kalender-ikon -->
      <button
        v-if="showCalendar"
        class="calendar-btn"
        @click.stop="addToCalendar"
      >
        📅
      </button>
    </div>

    <div class="event-info">
      <div class="event-date-container">
        <p class="event-date">{{ event.date }}</p>

        <div v-if="event.specialLabel?.length" class="special-label">
          {{ event.specialLabel.join(', ') }}
        </div>
      </div>

      <div class="event-title-container">
        <h3 class="event-title">{{ event.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  background-color: #efefef;
  padding: 1.2rem;
  text-align: left;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}

/* Fyld mere på desktop */
@media (min-width: 1024px) {
  .event-card {
    padding: 1.5rem;
    min-height: 320px; /* kortet fylder lidt mere */
  }
}

.image-wrapper {
  position: relative;
}

.event-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
}

/* Hjerte */
.favorite-btn {
  position: absolute;
  top: 2px;
  right: 0;
  z-index: 10;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #84754e;
  transition: transform 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

/* Kalender-ikon */
.calendar-btn {
  position: absolute;
  top: 2px;
  right: 2.5rem;
  z-index: 5;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #84754e;
}

.calendar-btn:hover {
  transform: scale(1.2);
}

.event-info {
  margin-top: 0.4rem;
}

.event-date-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

.event-date {
  font-size: 0.9rem;
  color: #84754e;
  margin-bottom: 0.5rem;
}

.event-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-title {
  font-size: 1.2rem;
  color: #84754e;
  font-weight: bold;
  margin: 0;
}

.special-label {
  background-color: #84754e;
  color: white;
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  display: inline-block;
  margin-left: 0.5rem;
}

/* Mobiltilpasning */
@media (max-width: 480px) {
  .special-label {
    font-size: 0.40rem;
    padding: 0.05rem 0.3rem;
    margin-left: 0.3rem;
  }
}
</style>

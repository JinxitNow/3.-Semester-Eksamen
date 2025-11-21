<script setup>
import { ref, onMounted, watch, toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  event: { type: Object, required: true },
  hideFavorite: { type: Boolean, default: false },
  showCalendar: { type: Boolean, default: true }
});

const { event } = toRefs(props);

const isFavorite = ref(false);

/* FAVORITSTATUS */
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    isFavorite.value = saved.some(ev => ev.id === event.value?.id);
  } catch {
    isFavorite.value = false;
  }
});

watch(
  () => localStorage.getItem("favorites"),
  (newVal) => {
    try {
      const saved = JSON.parse(newVal) || [];
      isFavorite.value = saved.some(ev => ev.id === event.value?.id);
    } catch {
      isFavorite.value = false;
    }
  }
);

/* FAVORIT → Favorit.vue */
function toggleFavorite() {
  try {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite.value) {
      const updated = saved.filter(ev => ev.id !== event.value.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      isFavorite.value = false;
    } else {
      saved.push(event.value);
      localStorage.setItem("favorites", JSON.stringify(saved));
      isFavorite.value = true;
    }
  } catch (e) {
    console.error("Fejl ved opdatering af favorites:", e);
  }

  router.push("/favoritter");
}

/* KALENDER → Reminder.vue */
function addToCalendar() {
  router.push("/reminder");
}

/* NAVIGATION TIL EventDetail */
function goToDetail() {
  router.push({ name: "EventDetail", params: { id: event.value.id } });
}

/* FORMATERING */
function capitalize(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return capitalize(
    date.toLocaleDateString("da-DK", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  );
}
</script>

<template>
  <div v-if="event" class="event-card">
    <!-- BILLEDE → EventDetail -->
    <div class="image-wrapper" @click="goToDetail">
      <img
        v-if="event.image"
        :src="`/img/${event.image}`"
        :alt="event.title"
        class="event-image"
      />
      <div v-else class="event-image placeholder">Ingen billede</div>

      <!-- FAVORITKNAP → Favorit.vue -->
      <button
        v-if="!hideFavorite"
        class="favorite-btn"
        @click.stop="toggleFavorite"
        aria-label="Favorit"
        type="button"
      >
        {{ isFavorite ? "❤️" : "🤍" }}
      </button>

      <!-- KALENDERKNAP → Reminder.vue -->
      <button
        v-if="showCalendar"
        class="calendar-btn"
        @click.stop="addToCalendar"
        aria-label="Tilføj til kalender"
        type="button"
      >
        📅
      </button>
    </div>

    <!-- TEKST → EventDetail -->
    <div class="event-info" @click="goToDetail">
      <div class="event-main">
        <p class="event-date">{{ formatDate(event.date) }}</p>
        <h3 class="event-title">{{ event.title }}</h3>
        <p v-if="event.kunstner" class="event-artist">{{ event.kunstner }}</p>
      </div>

      <div v-if="event.specialLabel?.length" class="special-label">
        {{ event.specialLabel.join(", ") }}
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
  cursor: default;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
}

.event-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.event-image.placeholder {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  color: #666;
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
.favorite-btn:hover { transform: scale(1.15); }

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
.calendar-btn:hover { transform: scale(1.15); }

.event-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1rem;
  cursor: pointer;
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
  margin: 0 0 0.5rem;
}

.event-date {
  font-size: 0.9rem;
  color: #84754e;
  margin: 0;
}

.event-artist {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: #555;
}

.special-label {
  background-color: #84754e;
  color: white;
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 0.4rem;
  height: fit-content;
  max-width: 120px;
  text-align: center;
}
</style>

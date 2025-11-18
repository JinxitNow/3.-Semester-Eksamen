<script setup>
import { ref, onMounted, computed } from "vue";
import Eventcard from "../components/Eventcard.vue";

const events = ref([]);
const favorites = ref([]);

// Hente events fra JSON-serveren
onMounted(async () => {
  const res = await fetch("http://localhost:3000/events");
  events.value = await res.json();

  const saved = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.value = saved;
});

// Computed: kun events som er favoritter
const favoriteEvents = computed(() =>
  events.value.filter(e => favorites.value.includes(e.id))
);

// Fjern favorit
const removeFavorite = (eventId) => {
  favorites.value = favorites.value.filter(id => id !== eventId);
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};
</script>

<template>
  <section class="favorite-feed">
    <!-- Overskrift ude til højre -->
    <div class="favorites-header">
      <h2 class="favorites-title">❤️ Mine favoritter</h2>
    </div>

    <div v-if="favoriteEvents.length" class="event-grid">
      <EventCard
        v-for="event in favoriteEvents"
        :key="event.id"
        :event="event"
      >
        <!-- Slot til slet-knap -->
        <template #actions>
          <button class="remove-btn" @click="removeFavorite(event.id)">Slet</button>
        </template>
      </EventCard>
    </div>

    <div v-else class="empty-message">
      Du har ingen favoritter endnu.
    </div>
  </section>
</template>

<style scoped>
.favorite-feed {
  padding: 2rem;
}


.favorites-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-right: 3rem;
}

.favorites-title {
  color: #84754e;
  font-weight: 500;
  font-size: 1rem;
  cursor: default;
}


.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
}


.remove-btn {
  background: #84754e;
  color: #0b0b0b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.remove-btn:hover {
  background: #a08b5d;
}

/*Hvis ingen favoritter er valgt */
.favorite-feed .empty-message {
  text-align: center;
  color: #84754e !important; /* !important tvinger farven */
  font-size: 1.2rem;
  margin-top: 2rem;
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";

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

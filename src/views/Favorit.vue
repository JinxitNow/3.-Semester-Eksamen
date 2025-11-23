<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EventCard from '../components/EventCard.vue';

const router = useRouter();
const favorites = ref([]);
const email = ref('');

// Hent favoritter fra localStorage
onMounted(() => {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.value = savedFavorites;
});

// Slet favorit
const removeFavorite = (id) => {
  favorites.value = favorites.value.filter(event => event.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

// Tilbage-knap: gå til UngIOdeon med hash/lande på det rigtige sted på siden
const goBack = () => {
  router.push({ name: 'UngIOdeon', hash: '#event-feed' });
};

</script>

<template>
  <section class="favorite-feed">
    <div class="favorites-header">
      <h2>❤️ Mine favoritter</h2>
      <p>Her kan du se dine gemte favorit-events.</p>
    </div>

    <div v-if="favorites.length" class="event-grid">
      <div
        v-for="event in favorites"
        :key="event.id"
        class="event-wrapper"
      >
        <EventCard
          :event="event"
          :hideFavorite="true"
          :showCalendar="false"
        />
        <button class="remove-btn" @click="removeFavorite(event.id)">Slet</button>
      </div>
    </div>

    <p v-else class="no-favorites">Du har ingen favoritter endnu.</p>

    <div class="back-btn-container">
      <button @click="goBack" class="back-btn">Tilføj flere favoritter</button>
    </div>
  </section>
</template>

<style scoped>
.favorite-feed {
  padding: 1rem;
}

.favorites-header {
  text-align: Center;
  margin-bottom: 2rem;
}

/* Event grid - MOBILE FIRST: 1 kolonne */
.event-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  justify-items: center;
}

.event-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ff4d4f;
  border: none;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
}

.remove-btn:hover {
  background: #ff7875;
}

.no-favorites {
  color: #84754e;
  font-style: italic;
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
}

.back-btn-container {
  text-align: right;
  margin-top: 1rem;
}

.back-btn {
  background: none;
  border: 1px solid #84754e;
  color: #927E47;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
}

.back-btn:hover {
  background: #84754e;
  color: #0b0b0b;
}

/* --- DESKTOP / TABLET --- */
@media (min-width: 768px) {
  .event-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .event-wrapper {
    width: 90%;
  }
 
}

@media (min-width: 1024px) {
  .event-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .event-wrapper {
    width: 100%;
  }
}
</style>

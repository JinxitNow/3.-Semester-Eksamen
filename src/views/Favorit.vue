<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EventCard from '../components/Eventcard.vue';

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

// Tilbage-knap
const goBack = () => {
  router.push('/');
};

// Send favoritter til email (dummy)
const sendEmail = () => {
  alert('Denne funktion virker desværre ikke endnu.');
};
</script>

<template>
  <section class="favorite-feed">
    <div class="favorites-header">
      <h2>❤️ Mine favoritter</h2>
      <h3>Du kan sende dine favoritter til din email</h3>
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

    <form @submit.prevent="sendEmail" class="email-form">
      <input type="email" v-model="email" placeholder="Din email" />
      <button type="submit">Send favoritter</button>
    </form> 

    <div class="back-btn-container">
      <button @click="goBack" class="back-btn">Tilføj favoritter</button>
    </div>
  </section>
</template>

<style scoped>
.favorite-feed {
  padding: 1rem;
}

.favorites-header {
  text-align: center;
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
  text-align: center;
  margin-top: -2rem;
}

.back-btn {
  background: none;
  border: 1px solid #84754e;
  color: #84754e;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
}

.back-btn:hover {
  background: #84754e;
  color: #0b0b0b;
}

/* Email form */
.email-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  align-items: center;
}

.email-form input {
  padding: 0.5rem;
  border: 1px solid #84754e;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

.email-form button {
  padding: 0.5rem 1rem;
  background-color: #84754e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
}

.email-form button:hover {
  background-color: #a49364;
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

  .email-form {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
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

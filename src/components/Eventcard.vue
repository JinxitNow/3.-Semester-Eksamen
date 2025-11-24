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

      </div>

    <!-- TEKST → EventDetail -->
    <div class="event-info" @click="goToDetail">
      <div class="event-main">
        <p class="event-date">{{ formatDate(event.date) }}</p>
        <h3 class="event-title">{{ event.title }}</h3>
      </div>

      <div v-if="event.specialLabel?.length" class="special-label">
        {{ event.specialLabel
          .filter(label => !["Kørestolsegnet", "Nummererede siddepladser"].includes(label))
          .join(", ") 
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>

/* --- MOBILE FIRST --- */

.event-card {
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  cursor: default;
  margin-bottom: 1rem;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
}

/* --- MOBILE FIRST --- */
.event-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.event-image.placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  color: #666;
}


.favorite-btn {
  position: absolute;
  top: 8px;
  background: none;
  border-radius: 6px;
  font-size: 1.25rem;
  cursor: pointer;
  color: #927E47;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* --- TEKST + SPECIAL LABEL --- */
.event-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0.75rem;
  margin-left: 0.5rem;
  cursor: pointer;
  gap: 0.5rem;
}

.event-main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.event-title {
  font-size: 1rem;
  color: ##927E47;
  font-weight: bold;
  margin: 0 0 0.25rem;
}

.event-date,
.event-artist {
  font-size: 0.8rem;
  margin: 0;
  color: #927E47;
}

.special-label {
  background-color: #927E47;
  color: white;
  font-size: 0.6rem;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  width: 100px;
  height: 40px;
  align-content: center;
  text-align: center;
  flex-shrink: 0;
}

/* --- TABLET / DESKTOP --- */
@media (min-width: 768px) {
  .event-card { padding: 1.5rem; }

  @media (min-width: 768px) {
  .event-image {
    height: 220px;
    object-fit: cover;
  }
}
  .favorite-btn{
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    border-radius: 6px;
  }

  .event-title { font-size: 1.2rem; }
  .event-date,
  .event-artist { font-size: 0.9rem; }

  .special-label {
    width: 120px;
    font-size: 0.8rem;
    padding: 0.4rem;
    border-radius: 6px;
  }
}

@media (min-width: 1024px) {
  .event-card { padding: 0rem; }

  .event-image {
  width: 440px;
  height: 300px;
  display: block;
}

  .favorite-btn { right: 10px; }
  
  .favorite-btn:hover {
     transform: scale(1.15); }

  .special-label {
    width: 110px;
    height: 45px;
    font-size: 0.8rem;
    align-content: center;
    margin-right: 10px;
  }
}

</style>

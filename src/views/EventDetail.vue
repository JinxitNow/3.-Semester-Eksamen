<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { database } from "../firebase.js"
import { ref as dbRef, get } from "firebase/database"

// Vi får ID fra routeren (props: true i router/index.js)
const props = defineProps({ id: String })

const event = ref(null)
const relatedEvents = ref([])
const router = useRouter()

onMounted(async () => {
  // Hent det valgte event
  const snapshot = await get(dbRef(database, "events/" + props.id))
  event.value = snapshot.val()

  // Hent relaterede events
  if (event.value?.categories?.length) {
    const allSnapshot = await get(dbRef(database, "events"))
    const allEvents = allSnapshot.val()

    if (allEvents) {
      relatedEvents.value = Object.entries(allEvents)
        .map(([id, val]) => ({ id, ...val }))
        .filter(
          ev =>
            ev.id !== props.id &&
            ev.categories?.some(cat => event.value.categories.includes(cat))
        )
        .slice(0, 3)
    }
  }
})
</script>

<template>
  <!-- Event info -->
  <div v-if="event" class="event-info">
    <div class="event-image-wrapper">
      <img
        v-if="event.image"
        :src="`/img/${event.image}`"
        :alt="event.title"
        class="event-img"
      />
    </div>

    <div class="event-details-box">
      <h2>{{ event.title }}</h2>
      <p><b>Kunstner:</b> {{ event.kunstner }}</p>
      <p><b>Lokation:</b> {{ event.sted }}</p>

      <p>
        <b>Dato:</b> {{ event.date }}
        <span v-if="event.time"> kl. {{ event.time }}</span>
      </p>

      <p><b>Pris:</b> {{ event.pris }}</p>

      <p v-if="event.om"><b>Om eventet:</b> {{ event.om }}</p>

      <div v-if="event.specialLabel?.length" class="labels-container">
        <b>Bemærk:</b>
        <div class="labels-list">
          <span
            v-for="lab in event.specialLabel"
            :key="lab"
            class="special-label"
          >
            {{ lab }}
          </span>
        </div>
      </div>

      <!-- Tilbage-knap -->
      <router-link to="/" class="back-btn">⬅ Tilbage til forsiden</router-link>
    </div>
  </div>

  <!-- Relaterede events -->
  <div v-if="relatedEvents.length" class="related">
    <h3>Måske er disse events noget for dig …</h3>
    <div class="related-list">
      <div v-for="ev in relatedEvents" :key="ev.id" class="related-item">
        <img v-if="ev.image" :src="`/img/${ev.image}`" :alt="ev.title" />
        <p>{{ ev.title }}</p>

        <router-link
          :to="{ name: 'EventDetail', params: { id: ev.id } }"
        >
          Se mere
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-detail {
  padding: 2rem;
}

.back-btn {
  background: #84754e;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
  text-decoration: none;
}

.back-btn:hover {
  background: #a49364;
}

.event-image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.event-img {
  max-width: 800px;
  width: 100%;
  height: auto;
}

.event-details-box {
  background-color: #f5f5f5;
  padding: 0.5rem 0.5rem;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.event-details-box p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #333;
}

.back-btn {
  background: #84754e;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  align-self: flex-end;
  margin-top: 1rem;
}

.back-btn:hover {
  background: #a49364;
}

.related {
  margin-top: 2rem;
  text-align: center;
}

.related-list {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.related-item {
  background: #f5f5f5;
  padding: 1rem;
  width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.related-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.related-item p {
  font-size: 1rem;
  margin: 0.3rem 0;
  font-weight: 500;
  color: #333;
}

.related-item a {
  font-size: 0.8rem;
  color: #84754e;
  text-decoration: none;
  margin-top: auto;
}

.related-item a:hover {
  text-decoration: underline;
}
</style>

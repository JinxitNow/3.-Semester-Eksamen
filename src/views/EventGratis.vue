<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import EventCard from '../components/Eventcard.vue'
import { database } from '../firebase.js'
import { ref as dbRef, onValue } from "firebase/database"

// State
const events = ref([])

// Firebase hentning
onMounted(() => {
  const eventsRef = dbRef(database, 'events')

  const unsubscribe = onValue(eventsRef, (snapshot) => {
    try {
      const data = snapshot.val() || {}

      events.value = Object.keys(data)
        .map(id => ({ id, ...data[id] }))
        .filter(e =>
          Array.isArray(e.specialLabel) &&
          e.specialLabel.map(l => l.toLowerCase()).includes("gratis")
        )
        .filter(e => {
          const eventDate = new Date(e.dateForSort || e.date || 0)
          return eventDate >= new Date()
        })
        .sort((a, b) =>
          new Date(a.dateForSort || a.date || 0) -
          new Date(b.dateForSort || b.date || 0)
        )
        .slice(0, 3)
    } catch (err) {
      console.error("Fejl ved hentning af gratis events:", err)
      events.value = []
    }
  })
})

onUnmounted(() => {
  // evt. cleanup
})
</script>

<template>
<section class="gratis-events-wrapper">

  <div class="title-wrapper">
    <h2>Gratis events</h2>
    <p>Her er de næste 3 gratis oplevelser på ODEON. Tag dine venner under armen og oplev noget helt særligt!</p>
  </div>

  <!-- EVENT GRID -->
  <div class="event-list">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <p v-if="events.length === 0" class="no-events">
      Ingen gratis events lige nu, kom tilbage senere!
    </p>
  </div>

  <!-- KNAP UDENFOR GRID -->
  <div class="back-btn-wrapper">
    <router-link to="/" class="back-btn">
      ← Tilbage til forsiden
    </router-link>
  </div>

</section>
</template>

<style scoped>
.gratis-events-wrapper {
  padding: 1rem;
}

.back-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.back-btn {
  background: #84754e;
  color: #fff;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  align-self: flex-end;
  margin-top: 1rem;
  font-size: 0.85rem;
}

.back-btn:hover {
  background: #a49364;
}

.title-wrapper {
  text-align: center;
  margin-bottom: 1rem;
}

.title-wrapper h2 {
  font-size: 1.5rem;
  color: #796535;
  margin-bottom: 0.5rem;
}

.title-wrapper p {
  font-size: 1rem;
  color: #84754e;
}

.event-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  padding-right: 1.5rem; /* forskyd griddet mod venstre */
}
/* Mobil først */
.no-events {
  text-align: center;
  font-style: italic;
  color: #84754e;
}

/* Tablet */
@media (min-width: 768px) {
  .event-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
 @media (min-width: 1024px) {
  .event-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-width: 75%;
  
   
  }
}

  .title-wrapper h2 {
    font-size: 2rem;
  }

  .title-wrapper p {
    font-size: 1.1rem;
  }
}
</style>

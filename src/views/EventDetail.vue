<script setup>
import { ref, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import { database } from "../firebase.js"
import { ref as dbRef, get } from "firebase/database"

// Vi får ID fra routeren (props: true i router/index.js)
const props = defineProps({ id: String })

const event = ref(null)
const relatedEvents = ref([])
const router = useRouter()

// Køb nu state
const showTicketMessage = ref(false)
const ticketMessage = ref("")
const ticketClicked = ref(false)

function handleBuyNow() {
  if (ticketClicked.value) return
  ticketClicked.value = true
  showTicketMessage.value = true
  ticketMessage.value = "Du omdirigeres nu til billetudbyder, vent venligst"

  setTimeout(() => {
    ticketMessage.value = "Desværre, der er ferielukket, prøv igen en anden dag"
  }, 5000)
}

// Funktion til at hente event + relaterede kommende events
async function fetchEventAndRelated(id) {
  // Hent det valgte event
  const snapshot = await get(dbRef(database, "events/" + id))
  event.value = snapshot.val()

  // Hent relaterede kommende events i samme kategori
  if (event.value?.categories?.length) {
    const allSnapshot = await get(dbRef(database, "events"))
    const allEvents = allSnapshot.val()

    if (allEvents) {
      const today = new Date().setHours(0,0,0,0)
      relatedEvents.value = Object.entries(allEvents)
        .map(([evId, val]) => ({ id: evId, ...val }))
        .filter(ev =>
          ev.id !== id &&
          ev.categories?.some(cat => event.value.categories.includes(cat)) &&
          ev.date && new Date(ev.date).setHours(0,0,0,0) >= today // kun kommende events
        )
        .slice(0, 3)
    }
  }
}

// Hent event ved mount
onMounted(() => {
  fetchEventAndRelated(props.id)
})

// Opdater event, når props.id ændres (navigering via relaterede events)
watch(() => props.id, (newId) => {
  ticketClicked.value = false
  showTicketMessage.value = false
  ticketMessage.value = ""
  fetchEventAndRelated(newId)
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

      <p v-if="event.kunstner"><b>Kunstner:</b> {{ event.kunstner }}</p>
      <p v-if="event.sted"><b>Lokation:</b> {{ event.sted }}</p>
      <p v-if="event.date">
        <b>Dato:</b> {{ event.date }}
        <span v-if="event.time"> kl. {{ event.time }}</span>
      </p>
      <p v-if="event.pris"><b>Pris i kr:</b> {{ event.pris }}</p>
      <p v-if="event.om"><b>Om eventet:</b> {{ event.om }}</p>

      <div v-if="event.specialLabel?.length" class="labels-container">
        <b>Bemærk:</b>
        <div class="labels-list">
          <p>{{ event.specialLabel.join(', ') }}</p>
          <p v-if="event.specialLabel.includes('Kørestolsegnet')">
            <strong>Kørestolsegnet:</strong> ja
          </p>
          <p v-if="event.specialLabel.includes('Nummererede siddepladser')">
            <strong>Nummererede siddepladser:</strong> ja
          </p>
        </div>
      </div>

      <!-- Køb nu-knap kun hvis eventet ikke er gratis -->
      <button 
        v-if="!event.specialLabel?.map(l => l.toLowerCase()).includes('gratis')"
        class="buy-now-btn" 
        @click="handleBuyNow" 
        :disabled="ticketClicked"
         >
        Køb nu
      </button>
            <p v-if="showTicketMessage" class="ticket-message">{{ ticketMessage }}</p>

      <!-- Tilbage-knap -->
      <router-link to="/" class="back-btn">⬅ Tilbage til forsiden</router-link>
    </div>
  </div>

  <!-- Relaterede kommende events -->
  <div v-if="relatedEvents.length" class="related">
    <h3>Måske er disse events noget for dig …</h3>
    <div class="related-list">
      <div v-for="ev in relatedEvents" :key="ev.id" class="related-item">
        <img v-if="ev.image" :src="`/img/${ev.image}`" :alt="ev.title" />
        <p>{{ ev.title }}</p>

        <router-link
          :to="{ name: 'EventDetail', params: { id: ev.id } }"
        >
          Læs mere
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

.buy-now-btn {
  background-color: #84754e;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 0.5rem;
}

.buy-now-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.ticket-message {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
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

/* Mobile-first: relaterede events under hinanden */
.related-list {
  display: flex;
  flex-direction: column; /* vertikal på mobil */
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.related-item {
  width: 90%; /* fylder det meste af mobilen */
  max-width: 300px;
}

/* Større skærme: horisontal layout */
@media (min-width: 768px) {
  .related-list {
    flex-direction: row; /* horisontal på tablet og større */
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .related-item {
    width: 200px; /* fast bredde på større skærme */
  }
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { database } from '../firebase.js'
import { ref as dbRef, push, set, onValue, remove, update } from 'firebase/database'

// Dagens dato uden klokkeslæt
const today = new Date().setHours(0, 0, 0, 0)

// Events liste
const eventsList = ref([])

// Labels
const visibleLabels = ['Udsolgt','Få pladser tilbage','Ung i ODEON rabat','Gratis']
const detailLabels = ['Kørestolsegnet','Nummererede siddepladser']
const possibleLabels = [...visibleLabels, ...detailLabels]

// Sorterede views
const upcomingEvents = computed(() =>
  eventsList.value
    .filter(event => event.date && new Date(event.date).setHours(0,0,0,0) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
)

const expiredEvents = computed(() =>
  eventsList.value
    .filter(event => event.date && new Date(event.date).setHours(0,0,0,0) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
)

// Liste af billeder
const availableImages = [
  'barselskomik.webp','cafe.webp','cafe2.webp','cafe3.jpg','choir.jpg',
  'event1.webp','event2.webp','event3.webp','hero1.jpg','hero2.webp',
  'hero3.webp','hero4.webp','hero5.webp','hero6.webp','magtenskorridorer.webp',
  'simontalbot.webp','tinka.webp','wallmans.webp','wordfestival.webp',
]

// Form fields
const title = ref('')
const date = ref('')
const time = ref('')
const image = ref('') // blank start
const kunstner = ref('')
const sted = ref('')
const om = ref('')
const pris = ref('')
const selectedCategories = ref([])
const selectedLabels = ref([])
const editingEventId = ref(null)
const possibleCategories = ['Comedy','Familie','Foredrag','Musical','Musik','Teater','Unge','Andet']

// Firebase reference
const eventsRef = dbRef(database, 'events')

// Hent events
function fetchEvents() {
  onValue(eventsRef, snapshot => {
    const data = snapshot.val()
    eventsList.value = data ? Object.entries(data).map(([key, val]) => ({
      id: key,
      title: val.title || '',
      date: val.date || '',
      time: val.time || '',
      image: val.image || '',
      kunstner: val.kunstner || '',
      sted: val.sted || '',
      om: val.om || '',
      pris: val.pris || '',
      categories: Array.isArray(val.categories) ? val.categories : [],
      specialLabel: Array.isArray(val.specialLabel) ? val.specialLabel : []
    })) : []
  })
}

// Opret/Opdater event
async function submitEvent() {
  if (!title.value || !date.value) return

  const payload = {
    title: title.value,
    date: date.value,
    time: time.value,
    image: image.value,
    kunstner: kunstner.value,
    sted: sted.value,
    om: om.value,
    pris: pris.value,
    categories: selectedCategories.value,
    specialLabel: selectedLabels.value
  }

  try {
    if (editingEventId.value) {
      await update(dbRef(database, 'events/' + editingEventId.value), payload)
    } else {
      await set(push(eventsRef), payload)
    }
    resetForm()
  } catch (err) {
    console.error('Gemning fejlede:', err)
  }
}

// Slet event
function deleteEvent(id) {
  remove(dbRef(database, 'events/' + id))
}

// Rediger event
function updateEvent(event) {
  title.value = event.title || ''
  date.value = event.date || ''
  time.value = event.time || ''
  image.value = event.image || ''
  kunstner.value = event.kunstner || ''
  sted.value = event.sted || ''
  om.value = event.om || ''
  pris.value = event.pris || ''
  selectedCategories.value = Array.isArray(event.categories) ? [...event.categories] : []
  selectedLabels.value = Array.isArray(event.specialLabel) ? [...event.specialLabel] : []
  editingEventId.value = event.id
}

// Nulstil formular
function resetForm() {
  title.value = ''
  date.value = ''
  time.value = ''
  image.value = ''
  kunstner.value = ''
  sted.value = ''
  om.value = ''
  pris.value = ''
  selectedCategories.value = []
  selectedLabels.value = []
  editingEventId.value = null
}

// Hjælpefunktion
function imageUrl(filename) {
  return filename ? `/img/${filename}` : ''
}

onMounted(fetchEvents)
</script>

<template>
  <section class="login-event-page">
    <div class="container">

      <!-- Links kolonne -->
      <div class="link-buttons">
        <div class="link-btn"><router-link to="/dashboard">Forside</router-link></div>
        <div class="link-btn"><router-link to="/medlems">Medlemsinformationer</router-link></div>
        <div class="link-btn"><router-link to="/statistik">Statistik</router-link></div>
        <div class="link-btn"><router-link to="/vejledninger">Brugervejledninger</router-link></div>
      </div>

      <!-- Formular kolonne -->
      <div class="column form-column">
        <h4>{{ editingEventId ? 'Rediger event' : 'Opret nyt event' }}</h4>
        <form @submit.prevent="submitEvent">
          <label>Titel*</label>
          <input v-model="title" placeholder="Event titel" required />

          <label>Kunstner</label>
          <input v-model="kunstner" placeholder="Kunstner"/>

          <label>Lokation*</label>
          <input v-model="sted" placeholder="Sted" required />

          <div class="date-time-wrapper">
            <div class="date-field">
              <label>Dato*</label>
              <input v-model="date" type="date" required />
            </div>
            <div class="time-field">
              <label>Klokken*</label>
              <input v-model="time" type="time" required />
            </div>
          </div>

          <label>Om eventet*</label>
          <input v-model="om" type="text" placeholder="Beskriv kort eventet" required />

          <label>Pris i kr.*</label>
          <input v-model="pris" placeholder="Pris" required />

          <label>Billede (vælg fra dropdown)*</label>
          <select v-model="image">
            <option value="">-- Vælg billede --</option>
            <option v-for="img in availableImages" :key="img" :value="img">{{ img }}</option>
          </select>

          <label><b>Kategorier*:</b></label>
          <div class="checkbox-group">
            <label v-for="cat in possibleCategories" :key="cat">
              <input type="checkbox" :value="cat" v-model="selectedCategories" /> {{ cat }}
            </label>
          </div>

          <label><b>Speciallabels*:</b></label>
          <div class="checkbox-group">
            <label v-for="lab in possibleLabels" :key="lab">
              <input type="checkbox" :value="lab" v-model="selectedLabels" /> {{ lab }}
            </label>
          </div>

          <div class="form-buttons">
            <button type="submit" class="primary-btn">
              {{ editingEventId ? 'Gem ændringer' : 'Opret event' }}
            </button>
            <button type="button" class="secondary-btn" @click="resetForm">
              Annuller
            </button>
          </div>
        </form>
      </div>

      <!-- Events kolonne -->
      <div class="column list-column">

        <!-- Kommende events -->
        <div class="event-box scroll-box upcoming-box">
          <h4>Kommende events</h4>
          <div class="events-list">
            <div v-if="!upcomingEvents.length" class="no-events">Ingen kommende events.</div>
            <div v-for="event in upcomingEvents" :key="event.id" class="event-item">
              <img v-if="event.image" :src="imageUrl(event.image)" :alt="event.title" class="event-img" />
              <div class="event-info two-column">
                <p class="event-title">{{ event.title }}</p>
                <p v-if="event.kunstner"><strong>Kunstner:</strong> {{ event.kunstner }}</p>
                <p v-if="event.sted"><strong>Sted:</strong> {{ event.sted }}</p>
                <p v-if="event.date"><strong>Dato:</strong> {{ event.date }}</p>
                <p v-if="event.time"><strong>Klokken:</strong> {{ event.time }}</p>
                <p v-if="event.pris"><strong>Pris:</strong> {{ event.pris }} kr.</p>
                <p v-if="event.categories?.length"><strong>Kategorier:</strong> {{ event.categories.join(', ') }}</p>
                <p v-if="event.specialLabel?.length">
                  <strong>Speciallabels:</strong> {{ event.specialLabel.filter(l => visibleLabels.includes(l)).join(', ') }}
                </p>
              </div>
              <div class="event-actions">
                <button @click="updateEvent(event)">Opdater</button>
                <button @click="deleteEvent(event.id)">Slet</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Udløbne events -->
        <div class="event-box scroll-box expired-box" style="margin-top:2rem;">
          <h4>Udløbne events</h4>
          <div class="events-list">
            <div v-if="!expiredEvents.length" class="no-events">Ingen udløbne events.</div>
            <div v-for="event in expiredEvents" :key="event.id" class="event-item expired">
              <img v-if="event.image" :src="imageUrl(event.image)" :alt="event.title" class="event-img" />
              <div class="event-info">
                <p class="event-title">{{ event.title }}</p>
                <p class="event-date">{{ event.date }}</p>
              </div>
              <div class="event-actions">
                <button @click="updateEvent(event)">Opdater</button>
                <button @click="deleteEvent(event.id)">Slet</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  align-items: flex-start;
}

.column {
  flex: 1 1 0;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  box-sizing: border-box;
}

.column h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.link-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-btn a {
  display: block;
  padding: 0.5rem 1rem;
  background-color: #84754e;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.85rem;
  text-align: center;
}

.link-btn a:hover {
  background-color: #a49364;
}

.form-column form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-column input,
.form-column select {
  padding: 0.4rem;
  border: 1px solid #84754e;
  border-radius: 5px;
}

.form-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.primary-btn {
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  background-color: #84754e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.primary-btn:hover {
  background-color: #a49364;
}

.secondary-btn {
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.secondary-btn:hover {
  background-color: #aaa;
}

.date-time-wrapper {
  display: flex;
  gap: 1rem;
}

.date-field,
.time-field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-events {
  text-align: center;
  font-size: 0.85rem;
  color: #555;
}

.event-item {
  background-color: #fff;
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.event-img {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}

.event-info p {
  margin: 0;
  font-size: 0.85rem;
}

.event-title {
  font-weight: 600;
}

.event-actions {
  display: flex;
  gap: 0.5rem;
}

.event-actions button {
  padding: 0.25rem 0.5rem;
  background-color: #84754e;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}

.event-actions button:hover {
  background-color: #a49364;
}

.event-box {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.upcoming-box {
  background: #ffffff;
}

.expired-box {
  background: #dcdcdc;
}

.scroll-box {
  max-height: 350px; 
  overflow-y: auto;
}

.expired-box .event-item {
  background-color: #e0e0e0;
  color: #666666;
}

.expired-box .event-item .event-title {
  color: #555555;
}

/* Skjul links kolonne på mobil */
@media (max-width: 768px) {
  .link-buttons {
    display: none;
  }
}

/* Container og kolonner */
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    gap: 1rem; /* mindre mellemrum */
    padding: 1rem;
  }

  .column {
    width: 100%;
    padding: 0.8rem;
  }
}

/* Event billeder og info */
@media (max-width: 768px) {
  .event-item {
    flex-direction: column;
    padding: 0.6rem;
  }

  .event-img {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin-bottom: 0.5rem;
  }

  .event-info.two-column {
    grid-template-columns: 1fr; /* single column på mobil */
    gap: 0.5rem;
  }

  .event-actions {
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Ekstra finjustering til meget små skærme */
@media (max-width: 480px) {
  .form-column input,
  .form-column select {
    font-size: 0.85rem;
  }

  .primary-btn, .secondary-btn {
    width: 100%;
    text-align: center;
  }

  .link-btn a {
    font-size: 0.8rem;
  }
}

</style>

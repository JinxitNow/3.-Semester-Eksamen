<script setup>
import { ref, onMounted } from 'vue'
import { database } from '../firebase.js'
import { ref as dbRef, push, set, onValue, remove, update } from 'firebase/database'

// Liste over billeder i public/img
const availableImages = [
  'barselskomik.webp','cafe.webp','cafe2.webp','cafe3.jpg','choir.jpg',
  'event1.webp','event2.webp','event3.webp','hero1.jpg','hero2.webp',
  'hero3.webp','hero4.webp','hero5.webp','hero6.webp','magtenskorridorer.webp',
  'simontalbot.webp','tinka.webp','wallmans.webp','wordfestival.webp',
]

// Form fields
const title = ref('')
const date = ref('')
const image = ref('')
const selectedCategories = ref([])
const selectedLabels = ref([])
const editingEventId = ref(null) // Holder ID for redigering

// Mulige kategorier og speciallabels
const possibleCategories = ['Comedy', 'Familie', 'Foredrag', 'Musical', 'Musik', 'Teater', 'Unge', 'Andet']
const possibleLabels = ['Udsolgt', 'Få pladser tilbage', 'Ung i ODEON rabat', 'Gratis']

// Events liste
const eventsList = ref([])

// Firebase reference
const eventsRef = dbRef(database, 'events')

// Hent events
function fetchEvents() {
  onValue(eventsRef, (snapshot) => {
    const data = snapshot.val()
    eventsList.value = data
      ? Object.entries(data).map(([key, val]) => ({
          id: key,
          title: val.title || '',
          date: val.date || '',
          image: val.image || availableImages[0],
          categories: Array.isArray(val.categories) ? val.categories : [],
          specialLabel: Array.isArray(val.specialLabel) ? val.specialLabel : []
        }))
      : []
  })
}

// Opret eller opdater event (med klar flow og nulstilling efter succes)
async function createEvent() {
  if (!title.value || !date.value) return

  const payload = {
    title: title.value,
    date: date.value,
    image: image.value,
    categories: selectedCategories.value,
    specialLabel: selectedLabels.value
  }

  try {
    if (editingEventId.value) {
      const eventRef = dbRef(database, 'events/' + editingEventId.value)
      await update(eventRef, payload)
      resetForm() // nulstil efter succes
    } else {
      const newEventRef = push(eventsRef)
      await set(newEventRef, payload)
      resetForm()
    }
  } catch (err) {
    console.error('Gemning fejlede:', err)
  }
}

function resetForm() {
  title.value = ''
  date.value = ''
  image.value = availableImages[0]
  selectedCategories.value = []
  selectedLabels.value = []
  editingEventId.value = null
}

// Slet event
function deleteEvent(id) {
  const eventRef = dbRef(database, 'events/' + id)
  remove(eventRef)
}

// Pop event ind i formular for redigering (robust mod manglende arrays)
function updateEvent(event) {
  try {
    title.value = event.title || ''
    date.value = event.date || ''
    image.value = event.image || availableImages[0]
    selectedCategories.value = Array.isArray(event.categories) ? [...event.categories] : []
    selectedLabels.value = Array.isArray(event.specialLabel) ? [...event.specialLabel] : []
    editingEventId.value = event.id
  } catch (err) {
    console.error('Kunne ikke indlæse event til redigering:', err)
  }
}

// Utility: url til public/img
function imageUrl(filename) {
  return filename ? `/img/${filename}` : ''
}

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <section class="login-event-page">
    <div class="container">

<div class="link-buttons">
  <div class="link-btn"><router-link to="/dashboard">Forside</router-link></div>
  <div class="link-btn"><router-link to="/medlems">Medlemsinformationer</router-link></div>
  <div class="link-btn"><router-link to="/statistik">Statistik</router-link></div>
  <div class="link-btn"><router-link to="/vejledninger">Brugervejledninger</router-link></div>
</div>


      <!-- Kolonne 2: Opret/rediger event -->
      <div class="column form-column">
        <h4>{{ editingEventId ? 'Rediger event' : 'Opret nyt event' }}</h4>

        <form @submit.prevent="createEvent">
          <label>Titel</label>
          <input v-model="title" placeholder="Event titel" required />

          <label>Dato</label>
          <input v-model="date" type="date" required />

          <label>Billede (vælg fra dropdown)</label>
          <select v-model="image">
            <option v-for="img in availableImages" :key="img" :value="img">{{ img }}</option>
          </select>

          <label><b>Kategorier:</b></label>
          <div class="checkbox-group">
            <label v-for="cat in possibleCategories" :key="cat">
              <input type="checkbox" :value="cat" v-model="selectedCategories" /> {{ cat }}
            </label>
          </div>

          <label><b>Speciallabels:</b></label>
          <div class="checkbox-group">
            <label v-for="lab in possibleLabels" :key="lab">
              <input type="checkbox" :value="lab" v-model="selectedLabels" /> {{ lab }}
            </label>
          </div>

          <button type="submit" class="primary-btn">
            {{ editingEventId ? 'Gem ændringer' : 'Opret event' }}
          </button>
          <!-- Midlertidig debug-indikator (kan fjernes) -->
          <!-- <small style="margin-left:8px;">[editing: {{ editingEventId }}]</small> -->
        </form>
      </div>

      <!-- Kolonne 3: Oversigt over events -->
      <div class="column list-column">
        <h4>Kommende events</h4>
        <div class="events-list">
          <div v-if="!eventsList.length" class="no-events">Der er endnu ingen events.</div>

          <div v-for="event in eventsList" :key="event.id" class="event-item">
            <img v-if="event.image" :src="imageUrl(event.image)" :alt="event.title" class="event-img" />
            <div class="event-info">
              <p class="event-title">{{ event.title }}</p>
              <p class="event-date">{{ event.date }}</p>
              <p class="event-categories" v-if="event.categories?.length">{{ event.categories.join(', ') }}</p>
              <p class="event-labels" v-if="event.specialLabel?.length">{{ event.specialLabel.join(', ') }}</p>
            </div>
            <div class="event-actions">
              <button @click="updateEvent(event)">Opdater</button>
              <button @click="deleteEvent(event.id)">Slet</button>
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

/* Kolonner */
.column {
  flex: 1 1 0;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  box-sizing: border-box;
}

/* Overskrifter */
.column h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

/* Links kolonne */
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

/* Formular kolonne */
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

/* Checkbox grupper */
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

/* Events kolonne */
.list-column {
  overflow-y: auto;
  max-height: 60vh;
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

/* Responsiv */
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
  }
  .event-img {
    max-width: 100%;
  }
}
</style>

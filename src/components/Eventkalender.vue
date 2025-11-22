<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import EventCard from './Eventcard.vue'
import { database } from '../firebase.js'
import { ref as dbRef, onValue } from "firebase/database"

// State
const showYouthEvents = ref(false)
const currentPage = ref(0)
const eventsPerPage = 6

// Dropdown
const showDropdown = ref(false)
const selectedCategory = ref(null)
const dropdownRef = ref(null)

// Events fra Firebase
const events = ref([])

// Dynamiske kategorier
const categories = ref([])

// Dropdown-funktioner
function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function selectCategory(cat) {
  selectedCategory.value = cat
  showDropdown.value = false
  currentPage.value = 0
}

// Luk dropdown hvis klik udenfor
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

// Hent events fra Firebase
onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  const eventsRef = dbRef(database, 'events')
  onValue(eventsRef, (snapshot) => {
    const data = snapshot.val() || {}
    events.value = Object.keys(data).map(id => ({
      id,
      ...data[id]
    }))

    // Opdater kategorier dynamisk
    const cats = new Set()
    events.value.forEach(e => e.categories?.forEach(c => cats.add(c)))
    categories.value = Array.from(cats).sort()
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Filtrer events
const filteredEvents = computed(() => {
  const now = new Date() // dagens dato

  let filtered = events.value
    // Kun events der ikke er udløbet
    .filter(e => {
      const eventDate = new Date(e.dateForSort || e.date)
      return eventDate >= now
    })

  // Filter for "unge" events
  if (!showYouthEvents.value) {
    filtered = filtered.filter(e => e.categories?.includes('Unge'))
  }

  // Filter efter valgt kategori
  if (selectedCategory.value) {
    filtered = filtered.filter(e => e.categories?.includes(selectedCategory.value))
  }

  // Sorter efter dato
  return filtered.sort((a, b) => new Date(a.dateForSort || a.date) - new Date(b.dateForSort || b.date))
})

// Pagination
const maxPage = computed(() => Math.ceil(filteredEvents.value.length / eventsPerPage))
const paginatedEvents = computed(() => {
  const start = currentPage.value * eventsPerPage
  return filteredEvents.value.slice(start, start + eventsPerPage)
})

function nextPage() {
  if (currentPage.value < maxPage.value - 1) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}

function goToPage(page) {
  currentPage.value = page
}
</script>


<template>
  <!-- Titel uden global padding -->
  <div class="eventkalender-title-wrapper">
    <h2>Kommende events</h2>
    <p>Hvor unge mødes og minder skabes. Koncerter, workshops og oplevelser du ikke vil gå glip af. Her finder ud de kommende events særligt for unge i alderen 18-35 år.</p>
  </div>

  <div class="filters-container">
    <div class="left">
      <label class="checkbox-container">
        <input type="checkbox" v-model="showYouthEvents" />
        <span class="checkbox-text">Vis alle events</span>
      </label>
    </div>

    <div class="right" ref="dropdownRef">
      <div class="filter-dropdown">
        <button class="action-btn" @click.stop="toggleDropdown">
          FILTER ▼
        </button>

        <div v-if="showDropdown" class="dropdown-menu">
          <div
            v-for="cat in categories"
            :key="cat"
            class="dropdown-item"
            @click="selectCategory(cat)"
          >
            {{ cat }}
          </div>
        </div>
      </div>

      <router-link to="/favoritter" class="favorites-btn">❤️ MINE FAVORITTER</router-link>
    </div>
  </div>

  <div class="event-list" v-if="paginatedEvents.length">
    <EventCard
      v-for="event in paginatedEvents"
      :key="event.id"
      :event="event"
    />
  </div>

  <p v-else class="no-events">Der er desværre ikke nogle events at vise, kom igen senere</p>

  <div class="pagination" v-if="paginatedEvents.length">
    <span
      @click="prevPage"
      :class="{ disabled: currentPage === 0 }"
      class="arrow-left"
    ></span>

    <div class="page-numbers">
      <span
        v-for="page in maxPage"
        :key="page"
        @click="goToPage(page - 1)"
        :class="{ active: currentPage === page - 1 }"
        class="page-num"
      >
        {{ page }}
      </span>
    </div>

    <span
      @click="nextPage"
      :class="{ disabled: currentPage >= maxPage - 1 }"
      class="arrow-right"
    ></span>
  </div>
</template>

<style scoped>
.event-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* --- MOBILE FIRST --- */
.filters-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.left {
  order: 1;
}

.right {
  order: 2;
  display: flex;
  gap: 0.5rem;
}

/* checkbox */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-container input[type="checkbox"] {
  accent-color: #84754e;
  width: 16px;
  height: 16px;
}

.checkbox-text {
  color: #84754e;
  font-size: 0.8rem;
}

/* Buttons */
.action-btn,
.favorites-btn {
  background-color: #84754e;
  color: #fff;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.75rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 32px;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
}

.action-btn:hover,
.favorites-btn:hover {
  background-color: #a49364;
}

/* --- TABLET / DESKTOP --- */
@media (min-width: 768px) {
  .filters-container {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }

  .right {
    display: flex;
    gap: 1rem;
  }

  .checkbox-text {
    font-size: 0.9rem;
  }

  .action-btn,
  .favorites-btn {
    width: 150px;
    height: 40px;
    font-size: 0.85rem;
  }
}

.event-list {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 1024px) {
  .action-btn,
  .favorites-btn {
    width: 180px;
    height: 40px;
    font-size: 0.9rem;  
    margin-right: 10px;
  }

  .event-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.filter-dropdown {
  position: relative;
  display: inline-block;
  z-index: 50;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 220px;
  background-color: #fff;
  border: 1px solid #84754e;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #84754e;
}

.dropdown-item:hover {
  background-color: #84754e;
  color: #fff;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.arrow-left,
.arrow-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px; 
  cursor: pointer;
  transition: transform 0.2s;
}

.arrow-left {
  border-width: 8px 12px 8px 0;
  border-style: solid;
  border-color: transparent #84754e transparent transparent;
}

.arrow-right {
  border-width: 8px 0 8px 12px;
  border-style: solid;
  border-color: transparent transparent transparent #84754e;
}

.arrow-left.disabled,
.arrow-right.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-num {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: #84754e;
  display: flex;
  align-items: center;
}

.page-num.active {
  background: #84754e;
  color: #fff;
}

/* Skjul specialLabel i Eventkalender.vue */
.event-card .special-label {
  display: none !important;
}
</style>

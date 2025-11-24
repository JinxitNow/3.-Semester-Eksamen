<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Eventcard from './Eventcard.vue'
import { database } from '../firebase.js'
import { getDatabase, ref as dbRef, onValue } from "firebase/database"

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
  let filtered = events.value

  if (!showYouthEvents.value) {
    filtered = filtered.filter(e => e.categories?.includes('Unge'))
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(e => e.categories?.includes(selectedCategory.value))
  }

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
  <div class="event-kalender-container">
    <h2>Kommende events</h2>
    <p>Her finder du spændende events særligt for unge</p>

    <div class="filters-container">
      <label class="checkbox-container">
        <input type="checkbox" v-model="showYouthEvents" />
        <span class="checkbox-text">Vis alle events</span>
      </label>

      <div class="buttons-right" ref="dropdownRef">
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

        <router-link to="/favoritter" class="favorites-btn action-btn">
          ❤️ MINE FAVORITTER
        </router-link>
      </div>
    </div>

    <div class="event-list" v-if="paginatedEvents.length">
  <router-link
    v-for="event in paginatedEvents"
    :key="event.id"
    :to="{ name: 'EventDetail', params: { id: event.id } }"
    class="event-link"
  >
    <Eventcard :event="event" />
  </router-link>
</div>


    <p v-else class="no-events">Der desværre ikke nogle events at vise, kom igen senere</p>

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
  </div>
</template>

<style>
/* --- MOBILE FIRST --- */
.filters-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 0 1rem;
}

.buttons-right {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.action-btn {
  background-color: #84754e;
  color: #fff;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  font-weight: 300;
  text-align: left;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.favorites-btn.action-btn {
  text-decoration: none;
}

.action-btn:hover {
  background-color: #a49364;
}

.checkbox-container {
  order: 2;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-container input[type="checkbox"] {
  accent-color: #84754e;
  width: 18px;
  height: 18px;
}

.checkbox-container .checkbox-text {
  font-size: 0.9rem;
  color: #84754e;
}

.event-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0 1rem;
}

.event-link {
  text-decoration: none;
  color: inherit;
  display: block;
}


/* --- DESKTOP --- */
@media (min-width: 768px) {
  .filters-container {
    flex-direction: row;
    justify-content: flex-end;
    gap: 2rem;
    padding: 0 2rem;
  }

  .checkbox-container {
    order: initial;
    width: auto;
  }

  .buttons-right {
    width: auto;
    justify-content: flex-end;
    gap: 1rem;
  }

  .event-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 481px) {
  .buttons-right {
    display: flex;
    gap: 1rem;
  }

  .action-btn,
  .favorites-btn {
    background-color: #84754e;
    color: #fff;
    border-radius: 8px;
    font-weight: 300;
    font-size: 0.9rem;
    height: 40px;
    padding-left: 15px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    cursor: pointer;
    min-width: 160px;
    transition: background-color 0.3s ease;
  }

  .action-btn:hover,
  .favorites-btn:hover {
    background-color: #a49364;
  }
}

/* Dropdown styling */
.filter-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: #fff;
  border: 1px solid #84754e;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.8rem;
  color: #84754e;
}

.dropdown-item:hover {
  background-color: #84754e;
  color: #fff;
}

/* Pagination styling */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.arrow-left,
.arrow-right {
  width: 0;
  height: 0;
  border-style: solid;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.arrow-left {
  border-width: 8px 12px 8px 0;
  border-color: transparent #84754e transparent transparent;
}

.arrow-right {
  border-width: 8px 0 8px 12px;
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
}

.page-num {
  cursor: pointer;
  font-size: 1rem;
  color: #84754e;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.page-num.active {
  font-weight: bold;
  color: #fff;
  background-color: #84754e;
}

.page-num:hover {
  background-color: #a49364;
  color: #fff;
}
</style>

<template>
  <div style="border:1px solid #ccc; padding:1em; margin:1em;">
    <h2>Beskeder</h2>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
    </ul>
    <input v-model="newMessage" placeholder="Skriv en besked..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref as vueRef, onMounted } from 'vue'
import { ref, set, onValue } from 'firebase/database'
import { database } from '../firebase' // Vigtigt: gå op fra components til src

// Reaktive data
const messages = vueRef([])
const newMessage = vueRef('')

// Hent data fra Firebase Realtime Database
onMounted(() => {
  const dbRef = ref(database, 'messages')
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val() || {}
    messages.value = Object.entries(data).map(([id, val]) => ({ id, ...val }))
  })
})

// Send ny besked til Firebase
function sendMessage() {
  if (!newMessage.value) return
  const id = Date.now().toString()
  set(ref(database, 'messages/' + id), { text: newMessage.value })
  newMessage.value = ''
}
</script>

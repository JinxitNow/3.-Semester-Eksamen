<template>
  <div class="reminder-wrapper" v-if="event">
    <h1 class="title">Reminder: {{ event.title }}</h1>

    <div class="event-info">
      <p><strong>Dato:</strong> {{ event.date }}</p>
      <p><strong>Tid:</strong> {{ event.time }}</p>
      <p><strong>Sted:</strong> {{ event.sted }}</p>
    </div>

    <p class="description">{{ event.om }}</p>

    <form @submit.prevent="submitReminder" class="form">
      <label>Fulde navn</label>
      <input v-model="name" type="text" required>

      <label>Email</label>
      <input v-model="email" type="email" required>

      <label>Telefon</label>
      <input v-model="phone" type="text" required>

      <label>Hvornår skal vi minde dig?</label>
      <input v-model="remindDate" type="date" required>

      <label><input type="checkbox" v-model="mail"> Jeg vil gerne modtage det på mail</label>
      <label><input type="checkbox" v-model="sms"> Jeg vil gerne modtage det på  SMS</label>

      <button class="btn" type="submit">Tilmeld reminder</button>
    </form>

    <p class="success" v-if="success">✔ Reminder gemt i Firebase!</p>
  </div>

  <div v-else class="reminder-wrapper">
    <h2>Event blev ikke fundet.</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { database } from "../firebase";
import { ref as dbRef, get, push, set } from "firebase/database";

const route = useRoute();

const event = ref(null);
const success = ref(false);

const name = ref("");
const email = ref("");
const phone = ref("");
const remindDate = ref("");
const mail = ref(false);
const sms = ref(false);

onMounted(async () => {
  const id = route.params.id;

  const eventRef = dbRef(database, "events/" + id);
  const snapshot = await get(eventRef);

  if (snapshot.exists()) {
    event.value = snapshot.val();
  }
});

async function submitReminder() {
  const refToSignup = push(dbRef(database, "reminderSignups"));

  await set(refToSignup, {
    eventId: route.params.id,
    eventName: event.value.title,
    fullName: name.value,
    email: email.value,
    phone: phone.value,
    remindDate: remindDate.value,
    sendMail: mail.value,
    sendSMS: sms.value,
    createdAt: new Date().toISOString()
  });

  success.value = true;
}
</script>

<style scoped>
/* Dit styling uændret */
.reminder-wrapper {
  width: 90%;
  max-width: 650px;
  margin: 40px auto;
  padding: 25px;
  background: #faf7ef;
  border-radius: 10px;
}
.title { font-size: 28px; color: #84754e; }
.event-info { margin-bottom: 15px; }
.description { margin-bottom: 25px; }
.form { display: flex; flex-direction: column; gap: 12px; }
.btn {
  background: #84754e; color: white;
  padding: 12px; border: none; cursor: pointer;
}
.success { color: green; margin-top: 15px; }
</style>

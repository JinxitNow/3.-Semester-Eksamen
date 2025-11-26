<template>
  <div class="reminder-page">
    <div v-if="loading" class="loading">Indlæser event...</div>

    <!-- FEJL -->
    <div v-else-if="!event">
      <p class="error"><strong>❌ Event ikke fundet</strong></p>
    </div>

    <!-- SIDE INDHOLD -->
    <div v-else class="reminder-content">

      <h1 class="event-title">{{ event.title }}</h1>

      <h2 class="section-header">Om Event</h2>

      <p><strong>Dato:</strong> {{ event.date }}</p>
      <p><strong>Tid:</strong> {{ event.time || event.specialLabel?.time || "Ukendt" }}</p>

      <p class="event-description">{{ event.om }}</p>

      <!-- FORMULAR -->
      <form class="reminder-form" @submit.prevent="submitReminder">

        <label>Fulde navn</label>
        <input v-model="form.fullName" type="text" required placeholder="F.eks. Anna Jensen" />

        <label>Tlf nr</label>
        <input v-model="form.phone" type="text" required placeholder="F.eks. 12 34 56 78" />

        <label>Mail</label>
        <input v-model="form.email" type="email" required placeholder="F.eks. anna@email.dk" />

        <label>Vælg dato for påmindelse</label>
        <input v-model="form.remindDate" type="date" required />

        <!-- CHECKBOXES -->
        <div class="checkbox-group">
          <label class="checkbox-item">
            <input type="checkbox" v-model="form.sendMail" />
            <span>Modtag reminder via mail</span>
          </label>

          <label class="checkbox-item">
            <input type="checkbox" v-model="form.sendSMS" />
            <span>Modtag reminder via SMS</span>
          </label>
        </div>

        <button type="submit" class="submit-btn">Tilmeld reminder</button>
      </form>

    </div>

    <!-- HØJRE BILLEDE -->
    <div v-if="event" class="image-wrapper">
      <img :src="`/img/${event.image}`" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { database } from "../firebase.js";
import { ref as dbRef, get, push, set } from "firebase/database";

const route = useRoute();

// STATES
const event = ref(null);
const loading = ref(true);

// FORM STATE
const form = ref({
  fullName: "",
  email: "",
  phone: "",
  remindDate: "",
  sendMail: false,
  sendSMS: false,
});

// 🔥 HENT EVENT FRA FIREBASE
onMounted(async () => {
  const eventId = route.params.id;
  if (!eventId) {
    loading.value = false;
    return;
  }

  const eventRef = dbRef(database, `events/${eventId}`);
  const snapshot = await get(eventRef);

  if (snapshot.exists()) {
    event.value = snapshot.val();
  } else {
    event.value = null;
  }

  loading.value = false;
});

// 🔥 GEM I reminderSignups
async function submitReminder() {
  const signupRef = dbRef(database, "reminderSignups");

  const newSignup = {
    eventId: route.params.id,
    eventName: event.value.title,
    fullName: form.value.fullName,
    email: form.value.email,
    phone: form.value.phone,
    remindDate: form.value.remindDate,
    sendMail: form.value.sendMail,
    sendSMS: form.value.sendSMS,
    createdAt: new Date().toISOString(),
  };

  const newRef = push(signupRef);
  await set(newRef, newSignup);

  alert("Du er nu tilmeldt en reminder!");

  // 🧹 RYD FORMULAR EFTER TILMELDING
  form.value = {
    fullName: "",
    email: "",
    phone: "",
    remindDate: "",
    sendMail: false,
    sendSMS: false,
  };
}
</script>

<style scoped>
.error {
  font-size: 24px;
  color: red;
  padding: 40px;
}

.loading {
  font-size: 20px;
  padding: 40px;
}

.reminder-page {
  display: flex;
  justify-content: space-between;
  padding: 60px 80px;
  background: #faf8f2;
  font-family: "Open Sans", sans-serif;
}

.reminder-content {
  width: 50%;
  padding-right: 40px;
}

.event-title {
  font-size: 42px;
  color: #84754e;
  margin-bottom: 30px;
}

.section-header {
  font-size: 26px;
  color: #84754e;
  margin-bottom: 20px;
}

.event-description {
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 16px;
}

/* INPUT-FELTER */
.reminder-form input {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* CHECKBOX GRUPPE */
.checkbox-group {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-item input {
  width: auto;
  height: auto;
}

/* KNAP */
.submit-btn {
  background: #867541;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

/* BILLEDE */
.image-wrapper {
  width: 45%;
}
</style>

<template>
  <div class="registration-section">

    <h2>Bliv en del af UNG I ODEON</h2>

    <form @submit.prevent="onSubmit" class="form-grid">

      <div class="input-group">
        <label>Navn og efternavn</label>
        <input v-model="fullName" required />
      </div>

      <div class="input-group">
        <label>Fødselsdag</label>
        <input v-model="birthday" type="date" required />
      </div>

      <div class="input-group">
        <label>Adresse 1</label>
        <input v-model="address1" required />
      </div>

      <div class="input-group">
        <label>Adresse 2</label>
        <input v-model="address2" />
      </div>

      <div class="input-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="input-group">
        <label>Mobilnummer</label>
        <input v-model="phone" type="tel" required />
      </div>

      <div class="checkboxes">
        <label>
          <input type="checkbox" v-model="acceptTerms" required />
          Jeg accepterer handelsbetingelser
        </label>

        <label>
          <input type="checkbox" v-model="acceptPolicy" required />
          Jeg accepterer privatpolitik
        </label>
      </div>

      <button type="submit">Tilmeld</button>
    </form>

    <p class="message" v-if="message">{{ message }}</p>

  </div>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "emailjs-com";
import { db } from "../firebase";
import { ref as dbRef, push, set } from "firebase/database";

// Form felter
const fullName = ref("");
const birthday = ref("");
const address1 = ref("");
const address2 = ref("");
const email = ref("");
const phone = ref("");
const acceptTerms = ref(false);
const acceptPolicy = ref(false);

const message = ref("");

// Generer medlemskode
function generateCode(len = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) {
    s += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return s;
}

async function onSubmit() {
  if (!acceptTerms.value || !acceptPolicy.value) {
    message.value = "Du skal acceptere betingelserne.";
    return;
  }

  try {
    const membersRef = dbRef(db, "members");
    const newMemberRef = push(membersRef);
    const code = generateCode(6);

    // Gem i Firebase
    await set(newMemberRef, {
      fullName: fullName.value,
      birthday: birthday.value,
      address1: address1.value,
      address2: address2.value,
      email: email.value,
      phone: phone.value,
      membershipCode: code,
      createdAt: Date.now(),
    });

    const memberId = newMemberRef.key;

    // EmailJS params
    const templateParams = {
      to_name: fullName.value,
      to_email: email.value,
      membership_code: code,
      member_id: memberId,
    };

    await emailjs.send(
      "service_viiagc2",
      "template_eh1z8l6",
      templateParams,
      "NBxFLic-Wi_ObTiV8"
    );

    message.value =
      "Du er nu medlem! Der er sendt en email med medlemskort.";

    // Reset
    fullName.value = "";
    birthday.value = "";
    address1.value = "";
    address2.value = "";
    email.value = "";
    phone.value = "";
    acceptTerms.value = false;
    acceptPolicy.value = false;
  } catch (err) {
    console.error(err);
    message.value = "Der skete en fejl.";
  }
}
</script>

<style scoped>
.registration-section {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
}

.checkboxes {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

button {
  grid-column: span 2;
  padding: 12px;
  cursor: pointer;
}

.message {
  margin-top: 15px;
  font-weight: bold;
}
</style>

<template>
  <section class="registration-section">
    <!-- FORMULAREN -->
    <div class="form-column">
      <div class="form-wrapper">
        <h2>Bliv en del af UNG I ODEON</h2>
        <p class="subtitle">Tilmeldt dig nu</p>

        <form @submit.prevent="onSubmit" class="form-grid">
          <div class="input-group">
            <label for="fullName">Navn og efternavn *</label>
            <input id="fullName" v-model="fullName" required />
          </div>

          <div class="input-group">
            <label for="birthday">Fødselsdag *</label>
            <input id="birthday" v-model="birthday" type="date" required />
          </div>

          <div class="input-group">
            <label for="address1">Gade og Nummer *</label>
            <input id="address1" v-model="address1" required />
          </div>

          <div class="input-group">
            <label for="address2">Postnummer og By *</label>
            <input id="address2" v-model="address2" required />
          </div>

          <div class="input-group">
            <label for="email">Email *</label>
            <input id="email" v-model="email" type="email" required />
          </div>

          <div class="input-group">
            <label for="phone">Mobilnummer *</label>
            <input id="phone" v-model="phone" type="tel" required />
          </div>

          <!-- Nederste del af formularen -->
          <div class="form-bottom">
            <label class="checkbox">
              <input type="checkbox" v-model="acceptTerms" />
              Accepter Handelsbetingelser
            </label>

            <label class="checkbox">
              <input type="checkbox" v-model="acceptPolicy" />
              Vil have nyhedsbrev
            </label>

            <button type="submit">TILMELD</button>
          </div>
        </form>

        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>

    <!-- BILLEDERNE -->
    <div class="image-column">
      <div class="image-wrapper">
        <div class="top-image">
          <img src="/img/event1.webp" alt="Medlemskort" />
        </div>
        <div class="bottom-images">
          <img src="/img/choir.jpg" alt="Unge synger" />
          <img src="/img/cafe3.jpg" alt="Café Odeon" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";
import { database } from "../firebase";
import { ref as dbRef, push, set } from "firebase/database";

const fullName = ref("");
const birthday = ref("");
const address1 = ref("");
const address2 = ref("");
const email = ref("");
const phone = ref("");
const acceptTerms = ref(false);
const acceptPolicy = ref(false);
const message = ref("");

function generateCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: len }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

async function onSubmit() {
  if (!acceptTerms.value) {
    message.value = "Du skal acceptere handelsbetingelserne.";
    return;
  }

  try {
    const membersRef = dbRef(database, "members");
    const newMember = push(membersRef);
    const code = generateCode();

    await set(newMember, {
      fullName: fullName.value,
      birthday: birthday.value,
      address1: address1.value,
      address2: address2.value,
      email: email.value,
      phone: phone.value,
      membershipCode: code,
      createdAt: Date.now(),
    });

    await emailjs.send(
      "service_viiagc2",
      "template_eh1z8l6",
      {
        to_name: fullName.value,
        to_email: email.value,
        membership_code: code,
        member_id: newMember.key,
      },
      "NBxFLic-Wi_ObTiV8"
    );

    message.value = "Du er nu medlem! Tjek din email.";
  } catch (err) {
    message.value = "Der skete en fejl. Prøv igen.";
  }
}
</script>

<style scoped>
.registration-section {
  display: flex;
  flex-direction: column;
  background-color: #EFEFEF;
  padding: 2rem 1rem;
  gap: 2rem;
}

/* FORMULAREN */
.form-column {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

.form-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 0.2rem; /* tættere på undertitel */
}

.subtitle {
  margin-bottom: 0.6rem; /* mindre afstand til felterne */
}

.form-grid {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 0;
}

.form-bottom {
  margin-top: auto; /* skubber denne del ned */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  margin-top: 1rem;
}

.message {
  margin-top: 1rem;
}

/* BILLEDERNE */
.image-column {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-image {
  flex: 0 0 auto;
  margin-bottom: 0.3rem;
}

.top-image img {
  width: 100%;
  object-fit: cover;
  border-radius: 0;
}

.bottom-images {
  flex: 1;
  display: flex;
  gap: 0.3rem;
}

.bottom-images img {
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

/* DESKTOP */
@media (min-width: 900px) {
  .registration-section {
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: 3rem;
    padding: 4rem 3rem;
  }

  .form-column,
  .image-column {
    width: 45%;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 2rem;
    flex: 1;
  }

  .form-bottom {
    grid-column: span 2;
    margin-top: auto;
  }
}
</style>

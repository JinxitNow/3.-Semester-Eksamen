<template>
  <!-- Wrapper der sikrer fuld bredde baggrund -->
  <div class="registration-wrapper">
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
  </div>
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
/* Wrapper der sikrer fuld bredde baggrund */
.registration-wrapper {
  background-color: #E4E3E1;
  width: 100vw;
  margin-left: -3.8rem; /* trækker ud under body padding */
  margin-right: -3.8rem;
  padding-left: 3.8rem; /* bevarer tekstens startpunkt */
  padding-right: 3.8rem; /* bevarer tekstens slutpunkt */
}

.registration-section {
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 2rem;
}

/* FORMULAREN */
.form-column {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  color: #796535;
}

.form-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 0.01rem;
}

.subtitle {
  margin-top: 0.1rem;
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 0.5rem;
  flex: 1;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 0;
  color: #4B4B4B; /* lysere tekstfarve */
  background-color: #fff;
}

/* Placeholder-tekst (hvis du bruger det) */
input::placeholder {
  color: #b8a989;
}

/* Kalender-ikonet i date-feltet */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: brightness(0.6); /* gør ikonet lidt lysere/brunere */
}

.form-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.01rem;
}


.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  border-color: #84754e;
   accent-color: #84754e;
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

.top-image img,
.bottom-images img {
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
}

/* DESKTOP */
@media (min-width: 900px) {
  .registration-section {
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    gap: 3rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .form-column,
  .image-column {
    width: 45%;
  }

  .form-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem 2rem;
  }

  .form-bottom {
    grid-column: span 1;
  }
}
</style>

<template>
  <div class="registration-wrapper">
    <section class="registration-section">
      
      <!-- FORM COLUMN -->
      <div class="form-column">
        <div class="form-wrapper">
          <h2>Bliv en del af UNG I ODEON</h2>
          <p class="subtitle">Tilmeld dig gratis nu</p>

          <!-- BILLEDER VISUELT INDBEDT I MOBIL -->
          <div class="mobile-image-stack">
            <img src="/img/event1.webp" class="hero-img" alt="Medlemskort" />
            <div class="bottom-stack">
              <img src="/img/choir.jpg" alt="Unge synger" />
              <img src="/img/cafe3.jpg" alt="Café Odeon" />
            </div>
          </div>

          <!-- FORM -->
          <form @submit.prevent="onSubmit" class="form-grid">

            <div class="input-group">
              <label>Navn og Efternavn *</label>
              <input v-model="fullName" />
              <p v-if="errors.fullName" class="error-msg">{{ errors.fullName }}</p>
            </div>

            <div class="input-group">
              <label>Fødselsdag *</label>
              <input v-model="birthday" type="date" />
              <p v-if="errors.birthday" class="error-msg">{{ errors.birthday }}</p>
            </div>

            <div class="input-group">
              <label>Adresse *</label>
              <input v-model="address1" />
              <p v-if="errors.address1" class="error-msg">{{ errors.address1 }}</p>
            </div>

            <div class="input-group">
              <label>Postnummer og By *</label>
              <input v-model="address2" />
              <p v-if="errors.address2" class="error-msg">{{ errors.address2 }}</p>
            </div>

            <div class="input-group">
              <label>Email *</label>
              <input v-model="email" type="email" />
              <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
            </div>

            <div class="input-group">
              <label>Mobilnummer *</label>
              <input v-model="phone" type="tel" />
              <p v-if="errors.phone" class="error-msg">{{ errors.phone }}</p>
            </div>

            <div class="form-bottom">
              <label class="checkbox">
                <input type="checkbox" v-model="acceptTerms" />
                Accepter <router-link to="/handelsbetingelser">handelsbetingelser</router-link>
              </label>

              <label class="checkbox">
                <input type="checkbox" v-model="acceptPolicy" />
                Ja tak til nyhedsbrev
              </label>

        <button type="submit" :disabled="loading">
        TILMELD
        <span v-if="loading" class="spinner"></span>
        </button>

            </div>
          </form>

          <p v-if="message" class="message">{{ message }}</p>
        </div>
      </div>

      <!-- DESKTOP IMAGE COLUMN -->
      <div class="image-column">
        <div class="image-wrapper">
          <img src="/img/event1.webp" class="hero-img" alt="Medlemskort" />
          <div class="bottom-stack">
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
const loading = ref(false);

const errors = ref({});

function validate() {
  errors.value = {};
  if (!fullName.value) errors.value.fullName = "Udfyld dit fulde navn.";
  if (!birthday.value) errors.value.birthday = "Vælg din fødselsdag.";
  if (!address1.value) errors.value.address1 = "Udfyld din adresse.";
  if (!address2.value) errors.value.address2 = "Udfyld postnummer og by.";
  if (!email.value.includes("@")) errors.value.email = "Udfyld en gyldig email.";
  if (!phone.value) errors.value.phone = "Udfyld mobilnummer.";
  if (!acceptTerms.value) errors.value.acceptTerms = "Du skal acceptere handelsbetingelserne.";
  return Object.keys(errors.value).length === 0;
}

function generateCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function onSubmit() {
  if (!validate()) return;

  loading.value = true;
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
  } catch {
    message.value = "Der skete en fejl. Prøv igen.";
  }
  loading.value = false;
}
</script>

<style scoped>
/*************** FULL WIDTH BACKGROUND ***************/
.registration-wrapper {
  background: #E4E3E1;
  width: 100vw;
  margin-left: -3.8rem;
  margin-right: -3.8rem;
  padding: 3.8rem;
}

/*************** LAYOUT ***************/
.registration-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 2rem;
}

.form-column {
  max-width: 600px;
  color: #796535;
}

.mobile-image-stack {
  display: flex;
  flex-direction: column;
  gap: .3rem;
  margin-bottom: 1.5rem;
  padding-right: 1.8rem;  /* højre padding */
  box-sizing: border-box; /* gør at padding tæller med i bredden */
}

.mobile-image-stack img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.mobile-image-stack img,
.image-column img {
  width: 100%;
  object-fit: cover;
}

.bottom-stack {
  display: flex;
  gap: .3rem;
  height: 200px;              /* fast højde på mobil */
  
}

.bottom-stack img {
  flex: 1;                    /* begge billeder deler pladsen ligeligt */
  object-fit: cover;          /* beskær så de fylder hele højden */
  height: 100%;               /* match containerens højde */
}


/*************** FORM ***************/
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem .5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: .1rem;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
  background: #fff;
  color: #4B4B4B;
}

/* DATE INPUT STYLING */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: brightness(0.55) sepia(1) saturate(0.5) hue-rotate(10deg);
  cursor: pointer;
}

.error-msg {
  font-size: 12px;
  color: #a62e2e;
  margin-top: -2px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 7px;
  accent-color: #84754e;
}

button {
  margin-top: 1rem;
  padding: .7rem 1.4rem;
  background: #796535;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin .9s linear infinite;
  margin-left: 8px; /* hvis spinneren er til højre */
}

@keyframes spin { to { transform: rotate(360deg);} }

/* Mobil: skjul desktop-billeder */
@media (max-width: 899px) {
  .image-column {
    display: none;
  }
}

/*************** DESKTOP ***************/
@media (min-width: 900px) {
  .registration-section {
    flex-direction: row;
    justify-content: space-between;
    gap: 3rem;
    padding-block: 4rem;
  }

  .form-grid {
    gap: 1rem 1.5rem; /* row-gap 1rem, column-gap 1.5rem */
  }


  .image-column {
    display: flex;
    max-width: 600px;
  }

  .mobile-image-stack {
    display: none;
  }

  .bottom-stack {
    height: 200px;
  }
}
</style>

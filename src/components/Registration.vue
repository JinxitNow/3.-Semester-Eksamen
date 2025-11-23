<template>
  <div class="registration-wrapper">
    <section class="registration-section">
      
      <!-- FORM COLUMN -->
      <div class="form-column">
        <div class="form-wrapper">
          <h2>Bliv en del af UNG I ODEON</h2>
          <p class="subtitle">Tilmeld dig gratis nu</p>

          <!-- MOBILBILLEDE -->
          <div class="mobile-image">
            <img src="/img/medlemskort.png" alt="Medlemskort" />
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
<br></br>
              
              <button type="submit" :disabled="loading">
                TILMELD
                <span v-if="loading" class="spinner"></span>
              </button>
            </div>
          </form>

          <p v-if="message" class="message">{{ message }}</p>
        </div>
      </div>

      <!-- DESKTOPBILLEDE -->
      <div class="image-column">
        <img src="/img/medlemskort.png" alt="Medlemskort" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue"
import emailjs from "@emailjs/browser"
import { database } from "../firebase"
import { ref as dbRef, push, set } from "firebase/database"

const fullName = ref("")
const birthday = ref("")
const address1 = ref("")
const address2 = ref("")
const email = ref("")
const phone = ref("")
const acceptTerms = ref(false)
const acceptPolicy = ref(false)
const message = ref("")
const loading = ref(false)

const errors = ref({})

function validate() {
  errors.value = {}
  if (!fullName.value) errors.value.fullName = "Udfyld dit fulde navn."
  if (!birthday.value) errors.value.birthday = "Vælg din fødselsdag."
  if (!address1.value) errors.value.address1 = "Udfyld din adresse."
  if (!address2.value) errors.value.address2 = "Udfyld postnummer og by."
  if (!email.value.includes("@")) errors.value.email = "Udfyld en gyldig email."
  if (!phone.value) errors.value.phone = "Udfyld mobilnummer."
  if (!acceptTerms.value) errors.value.acceptTerms = "Du skal acceptere handelsbetingelserne."
  return Object.keys(errors.value).length === 0
}

function generateCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

async function onSubmit() {
  if (!validate()) return

  loading.value = true
  try {
    const membersRef = dbRef(database, "members")
    const newMember = push(membersRef)
    const code = generateCode()

    await set(newMember, {
      fullName: fullName.value,
      birthday: birthday.value,
      address1: address1.value,
      address2: address2.value,
      email: email.value,
      phone: phone.value,
      membershipCode: code,
      createdAt: Date.now(),
    })

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
    )

    message.value = "Du er nu medlem! Tjek din email."
  } catch {
    message.value = "Der skete en fejl. Prøv igen."
  }
  loading.value = false
}
</script>

<style scoped>
.registration-wrapper {
  background: #E4E3E1;
  width: 100vw;
  margin-left: -3.8rem;
  margin-right: -3.8rem;
  padding: 3.8rem;
  box-sizing: border-box;
}

.registration-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 2rem;
}

.form-column {
  max-width: 600px;
  color: #796535;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  box-sizing: border-box;
}

.mobile-image {
  margin-bottom: 1.5rem;

}

.mobile-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  border-radius: 10px;
}

.image-column {
  display: none;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;   /* mobil: én kolonne */
  gap: 1rem .5rem;
  width: 100%;                 /* fyld hele bredden */
  box-sizing: border-box;       /* inkluder padding i bredden */
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: .1rem;
  width: 100%;                  /* input fylder hele kolonnen */
}

input {
  width: 100%;                  /* input fylder hele containeren */
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
  background: #fff;
  color: #4B4B4B;
  box-sizing: border-box;       /* undgå overflow */
}

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
  accent-color: #927E47;
}



button {
  margin-top: 1rem;
  padding: .7rem 1.4rem;
  background: #927E47;
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
  margin-left: 8px;
}

@keyframes spin { to { transform: rotate(360deg);} }

@media (min-width: 900px) {
  .form-grid {
    grid-template-columns: 1fr 1fr; /* to kolonner */
    gap: 1rem 1.5rem;
  }

  .registration-section {
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;     /* tekst og billede samme højde */
    gap: 2rem;
    padding-block: 1.5rem;    /* samme som membership */
    margin-left: -1.5rem;
    min-height: 350px;        /* samme højde som membership */
  }

  .image-column {
    display: flex;
    justify-content: flex-end;   /* centrer billedet */
    align-items: center;
    flex: 1;
    padding-right: 2.0rem;
  }

  .image-column img {
    width: 80%;
    height: auto;
    object-fit: contain; 
    border-radius: 10px;
    
  }

  .mobile-image {
    display: none;
  }

  .form-bottom {
    flex-direction: row;       /* side om side */
    align-items: center;
    gap: 1.5rem;
  }

  button {
    margin-top: 0;             /* knappen justeres ind */
  }

}
</style>

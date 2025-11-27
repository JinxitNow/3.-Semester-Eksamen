<script setup>
import { ref, onMounted } from "vue"
import { database } from "../firebase"
import { ref as dbRef, push, set, update, onValue, remove } from "firebase/database"
import emailjs from "@emailjs/browser"
import LoginShortcuts from '../components/LoginShortcuts.vue'

const fullName = ref("")
const birthday = ref("")
const address1 = ref("")
const address2 = ref("")
const email = ref("")
const phone = ref("")
const acceptTerms = ref(false)
const editingId = ref(null)
const message = ref("")
const loading = ref(false)
const errors = ref({})
const members = ref([])

function validate() {
  errors.value = {}
  if (!fullName.value) errors.value.fullName = "Udfyld navn."
  if (!birthday.value) errors.value.birthday = "Vælg fødselsdag."
  if (!address1.value) errors.value.address1 = "Udfyld adresse."
  if (!address2.value) errors.value.address2 = "Udfyld postnummer og by."
  if (!email.value.includes("@")) errors.value.email = "Ugyldig email."
  if (!phone.value) errors.value.phone = "Udfyld mobilnummer."
  if (!acceptTerms.value && !editingId.value) errors.value.acceptTerms = "Du skal acceptere handelsbetingelserne."
  return Object.keys(errors.value).length === 0
}

function generateCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

async function onSubmit() {
  if (!validate()) return
  loading.value = true

  const payload = {
    fullName: fullName.value,
    birthday: birthday.value,
    address1: address1.value,
    address2: address2.value,
    email: email.value,
    phone: phone.value,
    acceptTerms: acceptTerms.value,
    membershipCode: generateCode(),
    updatedAt: Date.now(),
  }

  try {
    if (editingId.value) {
      await update(dbRef(database, "members/" + editingId.value), payload)
      message.value = "Medlem opdateret."
    } else {
      const newRef = push(dbRef(database, "members"))
      await set(newRef, payload)

      await emailjs.send(
        "service_viiagc2",
        "template_eh1z8l6",
        {
          to_name: fullName.value,
          to_email: email.value,
          membership_code: payload.membershipCode,
          member_id: newRef.key,
        },
        "NBxFLic-Wi_ObTiV8"
      )

      message.value = "Medlem tilføjet og email sendt."
    }
    resetForm()
  } catch (err) {
    console.error(err)
    message.value = "Fejl ved gemning eller email."
  }
  loading.value = false
}

function resetForm() {
  fullName.value = ""
  birthday.value = ""
  address1.value = ""
  address2.value = ""
  email.value = ""
  phone.value = ""
  acceptTerms.value = false
  editingId.value = null
  errors.value = {}
}

function loadMembers() {
  onValue(dbRef(database, "members"), snapshot => {
    const data = snapshot.val()
    members.value = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : []
  })
}

function editMember(member) {
  fullName.value = member.fullName || ""
  birthday.value = member.birthday || ""
  address1.value = member.address1 || ""
  address2.value = member.address2 || ""
  email.value = member.email || ""
  phone.value = member.phone || ""
  acceptTerms.value = member.acceptTerms || false
  editingId.value = member.id
  message.value = "Du redigerer nu: " + member.fullName
}

function deleteMember(id) {
  remove(dbRef(database, "members/" + id))
}

onMounted(loadMembers)
</script>

<template>
  <section class="admin-members-page">
    <!-- Header -->
    <div class="members-header">
      <LoginShortcuts />
      <div class="members-heading">
        <h2>Medlemsliste</h2>
        <p class="members-subtitle">Administrer medlemmer: se, opdater, tilføj eller slet</p>
      </div>
    </div>

    <!-- Container til form og liste -->
    <div class="container">
      <!-- Form kolonne -->
      <div class="form-column">
        <h3>Tilføj eller opdater medlem</h3>
        <form @submit.prevent="onSubmit" class="form-grid">
          <div class="row">
            <div class="input-group">
              <label>Navn og Efternavn</label>
              <input v-model="fullName" />
              <p v-if="errors.fullName" class="error-msg">{{ errors.fullName }}</p>
            </div>
            <div class="input-group">
              <label>Fødselsdag</label>
              <input v-model="birthday" type="date" />
              <p v-if="errors.birthday" class="error-msg">{{ errors.birthday }}</p>
            </div>
          </div>

          <div class="row">
            <div class="input-group">
              <label>Adresse</label>
              <input v-model="address1" />
              <p v-if="errors.address1" class="error-msg">{{ errors.address1 }}</p>
            </div>
            <div class="input-group">
              <label>By og Postnummer</label>
              <input v-model="address2" />
              <p v-if="errors.address2" class="error-msg">{{ errors.address2 }}</p>
            </div>
          </div>

          <div class="row">
            <div class="input-group">
              <label>Email</label>
              <input v-model="email" type="email" />
              <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
            </div>
            <div class="input-group">
              <label>Mobilnummer</label>
              <input v-model="phone" type="tel" />
              <p v-if="errors.phone" class="error-msg">{{ errors.phone }}</p>
            </div>
          </div>

          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="acceptTerms" />
              Accepter handelsbetingelser
            </label>
          </div>

          <div class="form-buttons">
            <button type="button" class="secondary-btn" @click="resetForm">Annuller</button>
            <button type="submit" class="primary-btn">
              {{ editingId ? 'Opdater' : 'Tilføj' }}
              <span v-if="loading" class="spinner"></span>
            </button>
          </div>

          <p v-if="message" class="message">{{ message }}</p>
        </form>
      </div>

      <!-- Medlemsliste kolonne -->
      <div class="placeholder-column">
        <div class="member-wrapper">
          <h3>UNG I ODEON medlemmer</h3>
          <div class="member-scroll">
            <div v-if="!members.length" class="member-box empty">
              <p>Ingen medlemmer endnu.</p>
            </div>
            <div v-for="member in members" :key="member.id" class="member-box">
              <p><strong>{{ member.fullName }}</strong></p>
              <p>Født: {{ member.birthday }}</p>
              <p>Adresse: {{ member.address1 }}, {{ member.address2 }}</p>
              <p>Email: {{ member.email }}</p>
              <p>Mobil: {{ member.phone }}</p>
              <p v-if="member.acceptTerms">✔ Handelsbetingelser accepteret</p>
              <div class="actions">
                <button @click="editMember(member)">Opdater</button>
                <button @click="deleteMember(member.id)">Slet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- lukker .container -->
  </section>
</template>

<style scoped>
/* MOBILE FIRST DEFAULTS */
.admin-members-page {
  background: #efefef;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  overflow-x: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-column,
.placeholder-column {
  width: 100%;
}

/* FORMULAREN */
.form-column {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #867541;
  margin-bottom: 4px;
}

input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  background: #fff;
  color: #4B4B4B;
  border-radius: 4px;
}

.checkbox-group {
  margin-top: 0.5rem;
}

.checkbox-group label {
  font-size: 14px;
  color: #867541;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.primary-btn,
.secondary-btn {
  padding: 0.6rem 1.2rem;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.primary-btn {
  background-color: #867541;
  color: white;
}

.secondary-btn {
  background-color: #ccc;
  color: #333;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin .9s linear infinite;
  margin-left: 6px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-msg {
  font-size: 12px;
  color: #a62e2e;
  margin-top: 2px;
}

.message {
  margin-top: 1rem;
  font-size: 14px;
  color: #796535;
}

/* MEDLEMSLISTE */
.member-wrapper {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
    margin-top: 0rem;
}

.member-wrapper h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #796535;
  margin-bottom: 1.2rem;
}

.member-scroll {
  overflow-y: auto;
  max-height: 500px;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.member-box {
  background: #f9f9f9;
  padding: 1rem 1.2rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.member-box.empty {
  background: #fff;
  box-shadow: none;
  text-align: center;
  color: #999;
}

.member-box p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #4B4B4B;
}

.member-box .terms {
  font-size: 0.85rem;
  color: #796535;
  font-weight: 500;
  margin-top: 0.4rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 0.6rem;
}

.actions button {
  padding: 0.4rem 1rem;
  font-size: 13px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.actions button:first-child {
  background-color: #867541;
  color: #FBFBFB;
}

.actions button:last-child {
  background-color: #ccc;
  color: #333;
}

.actions button:hover {
  opacity: 0.9;
}

/* DESKTOP OVERRIDES */
@media (min-width: 769px) {
.member-wrapper {
  margin-top: -8rem;
}

    
  .admin-members-page {
    margin-left: 240px;
    padding: 2rem 3.8rem 2rem 0;
  }

  .container {
    flex-direction: row;
    align-items: flex-start;
    gap: 2.5rem;
  }

  .form-column {
    max-width: 540px;
  }

  .member-wrapper {
    max-width: 550px;
    max-height: 525px;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

.members-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.members-heading h2 {
  font-size: 1.8rem;
  color: #796535; /* samme farve som dashboard */
  margin: 0;
}

.members-subtitle {
  font-size: 0.95rem;
  color: #796535;
  margin-top: 0.5rem;
}

/* Responsiv */
@media (max-width: 1024px) {
  .members-header {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .members-heading {
    text-align: center;
  }
}

</style>

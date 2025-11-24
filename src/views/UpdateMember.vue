<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { database } from "../firebase"
import { ref as dbRef, get, update } from "firebase/database"

const route = useRoute()
const memberId = route.query.memberId

const member = ref(null)
const message = ref("")
const loading = ref(false)

onMounted(async () => {
  if (!memberId) {
    message.value = "Ingen medlem fundet."
    return
  }
  const snapshot = await get(dbRef(database, "members/" + memberId))
  if (snapshot.exists()) {
    member.value = snapshot.val()
  } else {
    message.value = "Medlem ikke fundet."
  }
})

async function saveChanges() {
  if (!member.value) return
  loading.value = true
  try {
    await update(dbRef(database, "members/" + memberId), {
      fullName: member.value.fullName,
      birthday: member.value.birthday,
      address1: member.value.address1,
      address2: member.value.address2,
      email: member.value.email,
      phone: member.value.phone,
    })
    message.value = "Dine oplysninger er opdateret!"
  } catch (err) {
    message.value = "Der skete en fejl. Prøv igen."
  }
  loading.value = false
}
</script>

<template>
  <section class="update-member">
    <h2>Opdater dine oplysninger</h2>

    <div v-if="member">
      <form @submit.prevent="saveChanges" class="form-grid">
        <div class="input-group">
          <label>Navn og Efternavn</label>
          <input v-model="member.fullName" />
        </div>

        <div class="input-group">
          <label>Fødselsdag</label>
          <input v-model="member.birthday" type="date" />
        </div>

        <div class="input-group">
          <label>Adresse</label>
          <input v-model="member.address1" />
        </div>

        <div class="input-group">
          <label>By og Postnummer</label>
          <input v-model="member.address2" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="member.email" type="email" />
        </div>

        <div class="input-group">
          <label>Mobilnummer</label>
          <input v-model="member.phone" type="tel" />
        </div>

        <button type="submit" :disabled="loading">
          Gem ændringer
          <span v-if="loading" class="spinner"></span>
        </button>
      </form>
    </div>

    <p v-else>{{ message }}</p>
  </section>
</template>

<style scoped>
.update-member {
  max-width: 500px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.update-member h2 {
  font-size: 1.6rem;
  color: #796535;
  margin-bottom: 1rem;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 600;
  color: #796535;
  margin-bottom: 4px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 1rem;
  padding: 0.7rem 1.4rem;
  background: #947e4a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
</style>

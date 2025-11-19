<template>
  <section class="registration-section">

    <div class="left-column">
      <h2>Bliv en del af UNG I ODEON</h2>
      <p class="subtitle">Tilmeldt dig nu</p>

      <form @submit.prevent="onSubmit" class="form-grid">

        <div class="input-group">
          <label>Navn og efternavn</label>
          <input v-model="fullName" required>
        </div>

        <div class="input-group">
          <label>Fødselsdag</label>
          <input v-model="birthday" type="date" required>
        </div>

        <div class="input-group">
          <label>Adresse 1</label>
          <input v-model="address1" required>
        </div>

        <div class="input-group">
          <label>Adresse 2</label>
          <input v-model="address2">
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" required>
        </div>

        <div class="input-group">
          <label>Mobilnummer</label>
          <input v-model="phone" type="tel" required>
        </div>

        <label class="checkbox">
          <input type="checkbox" v-model="acceptTerms">
          Accepter Handelsbetingelser
        </label>

        <label class="checkbox">
          <input type="checkbox" v-model="acceptPolicy">
          Vil have nyhedsbrev
        </label>

        <button type="submit" class="submit-btn">
          TILMELD
        </button>

      </form>

      <p v-if="message" class="message">{{ message }}</p>
    </div>

    <div class="right-column">

      <!-- Medlemskort -->
      <img
        class="membership-card"
        src="/img/event1.webp"
        alt="Medlemskort"
      />

      <!-- To billeder nederst -->
      <div class="bottom-images">
        <img src="/img/choir.jpg" alt="">
        <img src="/img/cafe3.jpg" alt="">
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

/* ----------- MOBILE FIRST ----------- */

.registration-section {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  background: #ffffff;
}

.left-column {
  width: 100%;
}

h2 {
  font-size: 1.8rem;
  color: #7c6a55;
  margin-bottom: 5px;
}

.subtitle {
  color: #7c6a55;
  margin-bottom: 25px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #7c6a55;
}

.submit-btn {
  background: #b49a6b;
  border: none;
  padding: 10px 0;
  font-weight: bold;
  color: #fff;
  margin-top: 10px;
}

.right-column {
  margin-top: 40px;
}

.membership-card {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.bottom-images {
  display: flex;
  gap: 10px;
}

.bottom-images img {
  width: 50%;
  border-radius: 8px;
  object-fit: cover;
}

/* ----------- DESKTOP ----------- */

@media (min-width: 900px) {
  .registration-section {
    flex-direction: row;
    justify-content: center;
    gap: 80px;
    padding: 60px;
  }

  .left-column {
    width: 500px;
  }

  .form-grid {
    grid-template-columns: 1fr 1fr;
  }

  .checkbox,
  .submit-btn {
    grid-column: span 2;
  }

  .right-column {
    width: 380px;
  }

  .membership-card {
    height: 215px;
    object-fit: cover;
  }

  .bottom-images img {
    height: 140px;
  }
}
</style>

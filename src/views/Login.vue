<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Når brugeren klikker på knappen, naviger til LoginEvent.vue
function goToAdmin() {
  router.push('/login-event')
}
</script>

<template>
  <section class="login-page">
    <div class="login-container">
      <h2>ODEON medarbejder Log-in</h2>
      
      <form @submit.prevent="goToAdmin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Indtast email" />
        </div>

        <div class="form-group">
          <label for="password">Kodeord</label>
          <input type="password" id="password" placeholder="Indtast kodeord" />
        </div>

        <button type="submit" class="login-btn">Log in</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #f7f7f7;
}

.login-container {
  background-color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-container h2 {
  margin-bottom: 1.5rem;
  color: #84754e;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #84754e;
}

.form-group input {
  padding: 0.5rem;
  border: 1px solid #84754e;
  border-radius: 5px;
  font-size: 0.9rem;
}

.login-btn {
  width: 100%;
  padding: 0.7rem;
  background-color: #84754e;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #a49364;
}
</style>

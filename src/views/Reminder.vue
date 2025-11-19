<template>
  <div class="reminder-page">

    <!-- VENSTRE TEKST SEKTION -->
    <div class="reminder-content">

      <h1 class="event-title">{{ eventTitle }}</h1>

      <h2 class="section-header">Om Event</h2>

      <p><strong>Dato:</strong> Lørdag d. 27. December 2025</p>
      <p><strong>Tid:</strong> 20:00 – 22:30</p>

      <p class="event-description">
        Oplev Mads Langer i en magisk sommeraften-koncert under åben himmel, hvor hans mest elskede sange får nyt liv i intime, akustiske arrangementer.
        Med sin karakteristiske stemme, nærværende tekster og varme energi inviterer Mads publikum helt tæt på.
      </p>

      <p class="event-description">
        Koncerten byder på både nye numre fra det kommende album "Lightwaves" og klassikere som "3AM",
        “Fact-Fiction” og “Flawless”. Publikum kan se frem til en aften fyldt med lys,
        kærlighed og ægte musikalsk nærvær.
      </p>

      <!-- FORM START -->
      <form class="reminder-form">

        <label>Fulde navn</label>
        <input type="text" placeholder="F.eks. Anna Jensen" />

        <label>Tlf nr</label>
        <input type="text" placeholder="F.eks. +45 12 34 56 78" />

        <label>Mail</label>
        <input type="email" placeholder="F.eks. anna.jensen@email.dk" />

        <label>Vælg tidspunkt for påmindelse</label>
        <input type="date" />

        <!-- CHECKBOXES -->
        <div class="checkbox-group">
          <label>
            <input type="checkbox" />
            Vil gerne modtage det på Mail
          </label>

          <label>
            <input type="checkbox" />
            Vil gerne modtage det på SMS
          </label>
        </div>

        <button type="submit" class="submit-btn">Tilmeld reminder</button>

      </form>
      <!-- FORM SLUT -->

    </div>

    <!-- HØJRE SIDE — BILLEDE -->
    <div class="image-wrapper">
      <img src="/img/event1.webp" alt="Event billede" />
    </div>

  </div>
</template>

<script setup>
const eventTitle = "Mads Langer";
</script>

<style scoped>
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

.reminder-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.reminder-form label {
  margin-top: 15px;
  font-weight: bold;
  color: #333;
}

.reminder-form input[type="text"],
.reminder-form input[type="email"],
.reminder-form input[type="date"] {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-group {
  margin: 20px 0;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.submit-btn {
  background: #84754e;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 200px;
  margin-top: 10px;
}

.submit-btn:hover {
  opacity: 0.85;
}

.image-wrapper {
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper img {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>

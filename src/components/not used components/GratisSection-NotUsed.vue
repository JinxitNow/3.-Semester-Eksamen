<template>
  <section class="joinus-wrapper">
    
    <div class="image-container">

      <!-- TEXT BOX -->
      <div class="text-box">
        <h2>Bliv medlem i dag og bliv en del af et stor fællesskab</h2>

        <p>
          UNG I ODEON samler alle de fedeste events for dig – koncerter, foredrag,
          workshops og meget mere.
        </p>

        <p>
          Hold dig opdateret og oplev, hvad der rører sig på ODEON – lige her, lige nu!
        </p>

        <p>
          Få rabatter på events, mad og drikkevarer i cafeen, og mange andre ting
          som medlem af UNG I ODEON!
        </p>

        <a class="link-btn" @click="scrollToBottom">Bliv medlem ></a>
      </div>

      <!-- IMAGE -->
      <img src="/img/karusel.webp" alt="Gratis arrangementer" class="joinus-img" />

    </div>

  </section>
</template>

<script setup>
function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
</script>

<style scoped>
/* WRAPPER — Hele sektionen */
.joinus-wrapper {
  width: calc(100% - 40px);
  margin-left: 20px;
  height: 80vh;
  display: flex;
  align-items: center;
  background: #f3f3f3;
  padding: 40px 0;
}

/* CONTAINER — billede + tekstboks */
.image-container {
  position: relative;
  width: calc(80% - 20px);
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* IMAGE */
.joinus-img {
  width: 1250px;
  height: 80%;
  object-fit: cover;
  object-position: center;
  opacity: 0.8;
  position: relative;
   margin-left: 30px;/* ← Flyt billedet */
}

/* TEXT BOX */
.text-box {
  position: absolute;
  top: 25px;        /* ← Ryk OP / NED */
  left: 1050px;       /* ← Ryk VENSTRE / HØJRE */
  z-index: 5;

  width: 750px;
  height: 500px;
  background: #E4E3E1;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* OVERSKRIFT */
.text-box h2 {
  color: #84754E;

}

/* BRØDTEKST */
.text-box p {
  color: #84754E;

}

/* LINK */
.link-btn {
  color: #84754E;
  font-weight: 600;
  font-size: 24px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 5px;
}

.link-btn:hover {
  opacity: 0.7;
}

/* MOBIL VERSION */
@media (max-width: 900px) {
  .joinus-wrapper {
    height: auto;
    padding: 40px 0;
  }

  .image-container {
    width: 100%;
    height: auto;
  }

  .joinus-img {
    margin-top: 100px;
    height: 250px;
    width: 100%;
    left: 0;
    object-fit: cover;
    margin-bottom: 20px;
    z-index: 2;
    order: -1;
  }

  .text-box {
    position: relative;
    width: calc(100% - 60px);
    left: 0;
    top: 0;
    padding: 30px;
    height: auto;
    margin-bottom: 20px;
  }
}
</style>

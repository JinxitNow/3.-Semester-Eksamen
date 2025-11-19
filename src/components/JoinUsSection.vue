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
      <img src="/img/Fakta.webp" alt="Join Us" class="joinus-img" />

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
  padding: 40px 0; /* ← Ryk hele sektionen ned/ud */
}

/* CONTAINER — Billedet + tekstboks */
.image-container {
  position: relative;
  width: calc(80% - 20px);
  height: 100%;
}

/* IMAGE (BAGGRUND) — Ryk billedet her */
.joinus-img {
  width: 100%;
  height: 80%;          /* ← Billedets højde */
  object-fit: cover;
  object-position: center;
  opacity: 0.8;
  position: relative;
  left: 360px;          /* ← Ryk billedet mod højre */
}

/* TEXT BOX — Her styrer du placering + størrelse */
.text-box {
  position: absolute;
  top: 25px;             /* ← Ryk OP/NED */
  left: 75px;            /* ← Ryk VENSTRE/HØJRE */
  z-index: 5;

  width: 750px;
  height: 500px;           /* ← Gør boksen bredere eller smallere */
  background: #E4E3E1;
  padding: 20px 20px;   /* ← Indre afstand til tekst */
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* OVERSKRIFT — Open Sans Semibold 40px */
.text-box h2 {
  width: 100%;
  margin-top: 0px;
  margin-left: -33px;

  color: #84754E;            /* ← Guld farve */
  font-size: 40px;           /* ← Overskrift størrelse */
  font-family: "Open Sans";  /* ← Font */
  font-weight: 600;          /* ← Semibold */
  margin-bottom: -40px;

}

/* BRØDTEKST — Open Sans Regular 24px */
.text-box p {
    width: 100%;
  color: #84754E;
  font-size: 24px;           /* ← Tekst størrelse */
  font-family: "Open Sans";  /* ← Font */
  font-weight: 400;          /* ← Regular */
  
}

/* LINK-KNAP */
.link-btn {
  color: #84754E;            /* ← Guld farve */
  font-weight: 600;
  font-size: 24px;
  text-decoration: none;
  cursor: pointer;
}

.link-btn:hover {
  opacity: 0.7;
}

/* MOBILE VERSION */
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
    height: 250px;     /* ← Billedhøjde på mobil */
    width: 100%;
    left: 0;
    object-fit: cover;
    margin-bottom: 20px;
  }

  .text-box {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    width: 100%;        /* ← Boks bredde på mobil */
    padding: 30px;
    margin-bottom: 20px;
  }
}
</style>

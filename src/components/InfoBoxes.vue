<template>
  <section class="info-box-wrapper" ref="wrapper">
    <!-- Infoboks -->
    <div class="info-box" ref="box">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
      <a :href="linkUrl" class="info-link">{{ linkText }} ></a>
    </div>

    <!-- Baggrundsbillede der starter ved midten af infoboksen -->
    <div
      class="image-side"
      :style="{
        backgroundImage: 'url(' + image + ')',
        left: 'calc(var(--left-padding) + var(--box-width) / 2)'
      }"
    >
      <div class="image-overlay"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoBoxes',
  props: {
    image: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    linkText: { type: String, default: 'Læs mere' },
    linkUrl: { type: String, default: '#' }
  },
  mounted() {
    this.updateBoxWidth();
    window.addEventListener('resize', this.updateBoxWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateBoxWidth);
  },
  methods: {
    updateBoxWidth() {
      const box = this.$refs.box;
      const wrapper = this.$refs.wrapper;
      if (!box || !wrapper) return;
      const boxWidth = box.offsetWidth;
      wrapper.style.setProperty('--box-width', `${boxWidth}px`);
      wrapper.style.setProperty('--left-padding', '3.8rem'); // matcher global body-padding
    }
  }
};
</script>

<style scoped>
/* Ydre wrapper: fuld bredde, relativ til at kunne positionere billedet */
.info-box-wrapper {
  position: relative;
  width: 100%;
  min-height: 360px;
  margin-bottom: 2rem;
  /* variabler opdateres fra JS for præcis placering */
  --box-width: 420px;     /* fallback hvis JS ikke når at køre */
  --left-padding: 3.8rem; /* global body padding */
}

/* Infoboksen: lodret centreret, men fastholder venstre padding */
.info-box {
  background-color: #E4E3E1;
  max-width: 420px;
  padding: 1.8rem;
  position: absolute;       /* ændret fra relative */
  top: 50%;                 /* lodret centrum */
  transform: translateY(-50%);
  z-index: 2;
  border: none;
}

.info-box h3 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 550; /* matcher dit look */
  color: #796535;
}

.info-box p {
  font-size: 16px;
  font-weight: 300;
  color: #796535;
}

/* Link styling */
.info-link {
  display: inline-block;
  margin-top: 8px;
  font-weight: 400;
  text-decoration: underline;
  color: #796535;
  transition: color 0.3s ease;
}
.info-link:hover { color: #947e4a; }

/* Billedet ligger absolut og starter ved midten af infoboksen */
.image-side {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0; /* fylder hele wrapper-højden */
  /* left sættes dynamisk via inline style: calc(var(--left-padding) + var(--box-width)/2) */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

/* Lys overlay på billede */
.image-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.25);
  pointer-events: none;
}

/* Mobile: billede først, centreret, samme bredde som infoboksen */
@media (max-width: 767px) {
  .info-box-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: unset;
    margin-bottom: 2rem;
  }

  .image-side {
    position: relative !important;
    order: -1;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;

    width: 100%;
    max-width: 420px;
    height: 200px; /* 👈 FIX – giver plads til billedet */
    margin: 0 auto 12px;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
  }

  .image-overlay {
    display: block;
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.55);
  }

  .info-box {
    position: static !important;
    transform: none !important;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 1.4rem;
  }
}


/* Tablet/desktop: lidt mere luft, men samme princip */
@media (min-width: 768px) {
  .info-box-wrapper {
    min-height: 400px;
  }
}
</style>

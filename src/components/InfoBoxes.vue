<template>
  <section class="info-box-wrapper" ref="wrapper">
    <!-- Infoboks -->
    <div class="info-box" ref="box">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
      
      <!-- Klik-event hvis man vil åbne Registration direkte -->
   <router-link
  :to="linkUrl || '#'"
  class="info-button"
  @click.prevent="$emit('click')"
>
  {{ linkText }}
</router-link>

    </div>

    <!-- Baggrundsbillede -->
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
      wrapper.style.setProperty('--left-padding', '3.8rem');
    }
  }
};
</script>

<style scoped>
/* --- beholder din CSS som før --- */
.info-box-wrapper {
  position: relative;
  width: 100%;
  min-height: 360px;
  margin-bottom: 2rem;
  --box-width: 420px;
  --left-padding: 3.8rem;
}

.info-box {
  background-color: #E4E3E1;
  max-width: 420px;
  padding: 1.8rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border: none;
}

.info-box h3 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 550;
  color: #796535;
}

.info-box p {
  font-size: 16px;
  font-weight: 200;
  color: #796535;
}

/* Link styling - underline kun */
.info-button {
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 550;
  color: #796535;
  text-decoration: underline;
  cursor: pointer;
}

.info-button:hover {
  color: #947e4a;
}

/* Billede absolut */
.image-side {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.25);
  pointer-events: none;
}

@media (max-width: 767px) {
  .info-box-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: unset;
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
    height: 200px;
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
  }
}

@media (min-width: 768px) {
  .info-box-wrapper {
    min-height: 400px;
  }
}
</style>

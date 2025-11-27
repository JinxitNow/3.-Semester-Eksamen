<script setup>
import TutorialLayout from '../components/TutorialLayout.vue'

const steps = [
  {
    title: "Sådan bruger du statistiksiden",
    items: [
      { 
        text: "Statistiksiden giver dig som admin et hurtigt overblik over medlemmer og events. Du kan se det samlede antal medlemmer, hvor mange nye der er kommet i den nuværende måned, en enkel aldersfordeling og de mest repræsenterede postnumre/byer. For events vises hvor mange der er aktive, hvor mange der er overskredne, samt en fordeling af oprettede events pr. kategori. Siden er lavet til at være enkel og overskuelig – ikke avanceret, men nok til at give dig et klart billede af udviklingen.", 
        image: "/img/statistikker.webp" 
      }
    ]
  }
]
</script>

<template>
  <TutorialLayout
    title="Statistik Tutorial"
    :steps="steps"
    prevRoute="/tutorial/events"
  />
</template>

<!--
📘 Code Description – Tutorial Pages

Denne opsætning er lavet som et fælles layout (`TutorialLayout.vue`), som alle tutorials (Campaign, Event, Statistics, Memberlist) kan bruge.
Formålet er at vise tekst + billede par i bokse, så hvert billede har sin egen forklaring.

Struktur:
- Hver tutorial-side importerer `TutorialLayout.vue`
- Dataen består af et `steps`-array
- Hvert step har en `title` og en liste af `items` (tekst + billede)

Eksempel:
const steps = [
  {
    title: "Tilføj kampagneindhold",
    items: [
      { text: "Step 1: Klik på 'Tilføj indhold'.", image: "/img/event1.webp" },
      { text: "Step 2: Upload billede og tekst.", image: "/img/event1.webp" }
    ]
  }
]

Sådan kan I nemt lave tutorials med flere bokse, og hver boks kan indeholde flere billeder med deres egen tekst.
-->


<script setup>
import TutorialLayout from '../components/TutorialLayout.vue'

const steps = [
  {
    title: "Introduktion til kampagnesiden",
    items: [
      { text: "Step 1: Gå ind på kampagnesiden via menuen.", image: "/img/event1.webp" },
      { text: "Step 2: Læs introduktionsteksten som forklarer strukturen.", image: "/img/event1.webp" }
    ]
  },
  {
    title: "Tilføj kampagneindhold",
    items: [
      { text: "Step 1: Klik på 'Tilføj indhold'.", image: "/img/event1.webp" },
      { text: "Step 2: Upload billede og tekst.", image: "/img/event1.webp" },
      { text: "Step 3: Gem ændringerne.", image: "/img/event1.webp" }
    ]
  },
  {
    title: "Opdater eksisterende indhold",
    items: [
      { text: "Step 1: Find indholdet du vil ændre.", image: "/img/event1.webp" },
      { text: "Step 2: Klik på 'Rediger'.", image: "/img/event1.webp" }
    ]
  },
  {
    title: "Slet kampagneindhold",
    items: [
      { text: "Step 1: Vælg indholdet du vil slette.", image: "/img/event1.webp" },
      { text: "Step 2: Bekræft sletningen.", image: "/img/event1.webp" }
    ]
  }
]
</script>

<template>
  <TutorialLayout 
  title="Kampagneside Tutorial" 
  :steps="steps"
  nextRoute="/tutorial/events"
/>

</template>

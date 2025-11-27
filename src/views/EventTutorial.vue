<script setup>
import TutorialLayout from '../components/TutorialLayout.vue'

const steps = [
  {
    title: "Introduktion til Events",
    items: [
      { 
        text: "Events håndteres både på kampagnesiden (eventkalenderen) og på admin‑siden. Admin‑siden består af tre bokse: 'Opret nyt event' til venstre, samt 'Kommende events' og 'Udløbne events' til højre.", 
        image: "/img/eventsiden.webp" 
      }
    ]
  },
  {
    title: "Opret nyt event",
    items: [
      { 
        text: "Step 1: Udfyld de generelle eventdetaljer: Titel, undertitel, lokation, dato, tid, beskrivelse, pris, billede.", 
        image: "/img/nyevent.webp" 
      },
      { 
        text: "Step 2: Vælg relevante kategorier (Comedy, Familie, Foredrag, Musical, Musik, Teater, Unge, Andet). Kategorien 'Unge' bruges til events målrettet unge, som vises på kampagnesiden, medmindre 'Vis alle' er valgt.", 
        image: "/img/kategorier.webp" 
      },
      { 
        text: "Step 3: Tilføj eventuelle speciallabels (fx Udsolgt, Få pladser tilbage, Ung i ODEON rabat, Gratis, Kørestolsegnet, Nummererede siddepladser). Disse vises direkte på eventet i kalenderen.", 
        image: "/img/labels.webp" 
      },
      { 
        text: "Step 4: Klik på 'Opret event'. Eventet tilføjes automatisk til både 'Kommende events' og kampagnesidens kalender. Hvis du ikke ønsker at oprette eventet, klik på 'Annuller'.", 
        image: "/img/tilfoej.webp" 
      }
    ]
  },
  {
    title: "Administrer kommende events",
    items: [
      { 
        text: "I boksen 'Kommende events' kan du scrolle gennem alle aktive events.", 
        image: "/img/eventlist.webp" 
      },
      { 
        text: "Klik på 'Slet' for at fjerne et event helt fra systemet og kampagnesiden.", 
        image: "/img/sletevent.webp" 
      },
      { 
        text: "Klik på 'Opdater' for at rette et event. Informationerne vises i venstre boks, hvor du kan ændre detaljer og gemme. Klik på 'Gem ændringer' for at opdatere, eller 'Annuller' for at afbryde.", 
        image: "/img/opdaterevent.webp" 
      }
    ]
  },
  {
    title: "Administrer udløbne events",
    items: [
      { 
        text: "I boksen 'Udløbne events' vises tidligere events, som systemet automatisk sorterer fra kampagnesiden. Du kan vælge at slette dem permanent, eller genbruge dem ved at ændre dato og informationer. Når et event opdateres til en fremtidig dato, flyttes det automatisk til 'Kommende events' og vises igen på kampagnesiden.", 
        image: "/img/udloebet.webp" 
      }
    ]
  },
  {
    title: "Eventkalenderen på kampagnesiden",
    items: [
      { 
        text: "På kampagnesiden vises eventkalenderen med udvalgte events for unge. Brugeren kan vælge 'Vis alle events' for at se hele ODEONs program.", 
        image: "/img/eventtu.webp" 
      },
      { 
        text: "Events kan likes ved at klikke på hjertet. De gemmes i en favoritliste, som kan tilgås ved næste besøg.", 
        image: "/img/favoritside.webp" 
      },
      { 
        text: "Kalenderen viser kun titel, dato og eventuelle labels (fx Gratis). Brugeren kan filtrere efter kategorier for at finde relevante events.", 
        image: "/img/filter.webp" 
      }
    ]
  },
  {
    title: "Eventdetaljesiden",
    items: [
      { 
        text: "Når man klikker på et event i kalenderen, åbnes en detaljeret side. Her vises alle oplysninger om eventet.", 
        image: "/img/eventside.webp" 
      },
      { 
        text: "På detaljesiden kan brugeren købe billet eller opsætte en reminder, som sendes på et selvvalgt tidspunkt.", 
        image: "/img/tickets.webp" 
      },
      { 
        text: "Under eventet vises automatisk andre events fra samme kategori, så brugeren kan opdage lignende arrangementer.", 
        image: "/img/relatedevents.webp" 
      }
    ]
  }
]
</script>

<template>
  <TutorialLayout 
    title="Event Tutorial" 
    :steps="steps"
    prevRoute="/tutorial/members"    
    nextRoute="/tutorial/statistics" 
  />
</template>


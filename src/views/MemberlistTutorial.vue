<script setup>
import TutorialLayout from '../components/TutorialLayout.vue'

const steps = [
  {
    title: "Introduktion til medlemslisten",
    items: [
      { 
        text: "Medlemslisten er en admin‑side, hvor administrator kan se alle tilmeldte medlemmer af Ung i ODEON. Til højre vises en rullemenu med titlen 'UNG I ODEON medlemmer', og til venstre findes boksen 'Tilføj eller opdater medlem'.", 
        image: "/img/memberlist_intro.webp" 
      }
    ]
  },
  {
    title: "Opret nyt medlem",
    items: [
      { 
        text: "Step 1: Udfyld felterne i boksen 'Tilføj eller opdater medlem' til venstre: Navn og Efternavn, Fødselsdag, Adresse, By og Postnummer, Email og Mobilnummer.", 
        image: "/img/memberlist_add.webp" 
      },
      { 
        text: "Step 2: Accepter handelsbetingelserne.", 
        image: "/img/memberlist_terms.webp" 
      },
      { 
        text: "Step 3: Klik på 'Tilføj'. Medlemmet bliver tilføjet til listen til højre, og en email sendes automatisk til den angivne adresse med medlemsinformationerne.", 
        image: "/img/memberlist_add_confirm.webp" 
      },
      { 
        text: "Hvis du ikke ønsker at tilføje medlemmet alligevel, klik på 'Annuller'. Felterne tømmes uden at tilføje medlemmet.", 
        image: "/img/memberlist_cancel.webp" 
      }
    ]
  },
  {
    title: "Opdater medlem",
    items: [
      { 
        text: "Step 1: Find medlemmet i listen til højre og klik på 'Opdater'.", 
        image: "/img/memberlist_update.webp" 
      },
      { 
        text: "Step 2: Medlemmets informationer vises nu i boksen til venstre. Ret de ønskede oplysninger, fx adresse eller mobilnummer.", 
        image: "/img/memberlist_update_form.webp" 
      },
      { 
        text: "Step 3: Klik på 'Opdater' for at gemme ændringerne. Informationerne opdateres i listen til højre. Der sendes ikke en ny email til medlemmet ved opdatering.", 
        image: "/img/memberlist_update_confirm.webp" 
      },
      { 
        text: "Hvis du ikke ønsker at ændre oplysningerne alligevel, klik på 'Annuller'. Felterne tømmes uden at gemme ændringer.", 
        image: "/img/memberlist_update_cancel.webp" 
      }
    ]
  },
  {
    title: "Slet medlem",
    items: [
      { 
        text: "Step 1: Find medlemmet i listen til højre.", 
        image: "/img/memberlist_delete.webp" 
      },
      { 
        text: "Step 2: Klik på 'Slet'. Medlemmets informationer fjernes helt fra systemet.", 
        image: "/img/memberlist_delete_confirm.webp" 
      }
    ]
  },
  {
    title: "Automatisk tilmelding fra kampagnesiden",
    items: [
      { 
        text: "Når en person tilmelder sig via kampagnesiden, tilføjes informationerne automatisk til medlemslisten. Samtidig sendes en email til personen med medlemsinformationerne.", 
        image: "/img/memberlist_auto.webp" 
      }
    ]
  }
]
</script>

<template>
<TutorialLayout
  title="Medlemsliste Tutorial"
  :steps="steps"
  prevRoute="/tutorial/statistics"
/>
</template>

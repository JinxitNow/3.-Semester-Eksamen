<script setup>
import TutorialLayout from '../components/TutorialLayout.vue'

const steps = [
  {
    title: "Introduktion til Ung i ODEON",
    items: [
      { 
        text: "Ung i ODEON er en kampagneside målrettet unge mellem 25–35 år bosat i Odense, da denne gruppe typisk har størst interesse og økonomi til at deltage i ODEONs arrangementer. Alle mellem 18 og 35 år kan dog blive medlem – uanset bopæl.", 
        image: "/img/tutorial_intro.webp" 
      }
    ]
  },
  {
    title: "Hero-sektionen",
    items: [
      { 
        text: "Øverst på kampagnesiden møder du Hero‑sektionen med et slideshow af udvalgte billeder. Billederne viser fællesskab, arrangementer og ODEONs tilbud – med fokus på personer under 35 år, især i slutningen af 20’erne, da de tiltaler målgruppen bedst. Der vises også billeder med børn for at signalere, at unge med familier er velkomne.", 
        image: "/img/tutorial_hero.webp" 
      },
      { 
        text: "Heroen indeholder en knap 'Se udvalgte events', som scroller ned til eventkalenderen. Siden er bygget som en one‑pager, så alt indhold findes på samme side.", 
        image: "/img/tutorial_hero_button.webp" 
      }
    ]
  },
  {
    title: "Infoboks om medlemskab",
    items: [
      { 
        text: "Efter Heroen kommer en infoboks, hvor du kan læse kort om Ung i ODEON‑medlemskabet. Medlemskabet fungerer som et ungekort, der giver rabatter og adgang til fællesskabet.", 
        image: "/img/tutorial_infobox1.webp" 
      },
      { 
        text: "Boksen viser et billede af caféen fyldt med mennesker – som symbol på fællesskab og for at gøre opmærksom på, at ODEON også har en café. Under teksten er der et link 'Bliv gratis medlem', som scroller ned til tilmeldingssektionen.", 
        image: "/img/tutorial_infobox_button.webp" 
      }
    ]
  },
  {
    title: "Eventkalenderen",
    items: [
      { 
        text: "Eventkalenderen viser udvalgte events for unge – baseret på research af populære arrangementer for målgruppen. Her fremhæves events med rabat for medlemmer eller gratis events for alle.", 
        image: "/img/tutorial_events.webp" 
      },
      { 
        text: "Du kan vælge at se alle ODEONs events ved at sætte hak i 'Se alle'. Der findes også en filterfunktion, hvor du kan filtrere efter kategorier som comedy, teater m.m.", 
        image: "/img/tutorial_filter.webp" 
      },
      { 
        text: "Klik på hjertet ved et event for at tilføje det til din favoritliste. Favoritterne gemmes, så du kan se dem næste gang du besøger siden.", 
        image: "/img/tutorial_favorites.webp" 
      },
      { 
        text: "Hvis du klikker på et event, kommer du ind på en detaljeret side. Her kan du læse mere, købe billet eller sætte en reminder, så du får en notifikation inden eventet starter.", 
        image: "/img/tutorial_event_detail.webp" 
      }
    ]
  },
  {
    title: "Infoboks med artikel",
    items: [
      { 
        text: "Under eventlisten findes endnu en infoboks, hvor ODEON kan poste månedens eller sæsonens relevante artikel. Eksempelvis en artikel om gratis events i december, målrettet unge.", 
        image: "/img/tutorial_infobox2.webp" 
      },
      { 
        text: "Klikker du på linket, bliver du videresendt til artiklen. Formålet er at gøre opmærksom på ODEONs events og understøtte kampagnen.", 
        image: "/img/tutorial_article_link.webp" 
      }
    ]
  },
  {
    title: "Medlemssektionen",
    items: [
      { 
        text: "Denne sektion beskriver fordelene ved at være medlem af Ung i ODEON: rabatter på events, caféen og hos samarbejdspartnere. Her står også kravene – at du skal være mellem 18 og 35 år.", 
        image: "/img/tutorial_membership.webp" 
      },
      { 
        text: "Et billede af glade unge understøtter budskabet. Under teksten er der en knap 'Tilmeld dig nu', som åbner tilmeldingsformularen.", 
        image: "/img/tutorial_membership_button.webp" 
      },
      { 
        text: "I formularen angiver du dine oplysninger og accepterer handelsbetingelserne. Der vises også et billede af medlemskortet. Når du trykker 'Tilmeld', sendes en bekræftelsesmail.", 
        image: "/img/tutorial_form.webp" 
      }
    ]
  },
  {
    title: "Footer",
    items: [
      { 
        text: "Til sidst finder du footeren med caféens åbningstider, så kunder hurtigt kan finde dem.", 
        image: "/img/tutorial_footer.webp" 
      },
      { 
        text: "Der er også tilføjet Facebook‑ og Instagram‑ikoner som blikfang, så flere får lyst til at følge ODEONs sociale medier.", 
        image: "/img/tutorial_footer_social.webp" 
      }
    ]
  },
  {
    title: "Kort om koden bag Ung i ODEON",
    items: [
      { 
        text: "Siden er bygget i Vue, som gør det nemt at dele koden op i små byggeklodser. Alt data gemmes i en Firebase‑database, og selve siden ligger også online via Firebase hosting.", 
        image: "/img/tutorial_code1.webp" 
      },
      { 
        text: "Der er lavet en global CSS‑fil, som styrer ting som skrifttyper og afstande, så hele siden ser ens ud. Det betyder, at designet er samlet ét sted og ikke skal gentages.", 
        image: "/img/tutorial_code2.webp" 
      },
      { 
        text: "Koden er opdelt i mapper: under 'components' ligger små dele som f.eks. en header, der kan genbruges på flere sider. Under 'views' ligger de forskellige sider, hvor komponenterne samles – f.eks. kampagnesiden (UngIOdeon.vue) og admin‑dashboardet (LoginDashboard.vue).", 
        image: "/img/tutorial_code3.webp" 
      },
      { 
        text: "Man kan tænke på det som LEGO‑klodser: komponenterne er de små brikker, og views er de færdige modeller, hvor brikkerne sættes sammen. På den måde er det nemt at vedligeholde og udvide siden.", 
        image: "/img/tutorial_code4.webp" 
      },
      { 
        text: "Hvis du vil se hele koden, ligger den på GitHub: [Se projektet her](https://github.com/dit-repo-link)", 
        image: "/img/tutorial_code5.webp" 
      }
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

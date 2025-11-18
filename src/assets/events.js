// Funktion til at få ugedagen på dansk
function getWeekdayInDanish(dateString) {
  const weekdays = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
  const date = new Date(dateString);
  return weekdays[date.getDay()];
}

// Funktion til at få måneden på dansk
function getMonthInDanish(dateString) {
  const months = [
    'januar', 'februar', 'marts', 'april', 'maj', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'december'
  ];
  const date = new Date(dateString);
  return months[date.getMonth()];
}

// Funktion til at formatere datoen til "dag, den dd. måned årstal" format
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = getMonthInDanish(dateString);
  const year = date.getFullYear();
  return `den ${day}. ${month} ${year}`;
}

export const events = [
  {
    id: 1,
    name: "Mads Langer",
    date: `${getWeekdayInDanish('2025-11-08')}, ${formatDate('2025-11-08')}`,
    dateForSort: '2025-11-08',
    image: "/src/assets/img/event1.webp",
    categories: ["Unge", "Musik"]
  },
  {
    id: 2,
    name: "Tapas & Talks",
    date: `${getWeekdayInDanish('2025-11-11')}, ${formatDate('2025-11-11')}`,
    dateForSort: '2025-11-11',
    image: "/src/assets/img/hero2.webp",
    categories: ["Unge", "Andet"]
  },
  {
    id: 3,
    name: "Fællesspisning",
    date: `${getWeekdayInDanish('2025-11-11')}, ${formatDate('2025-11-11')}`,
    dateForSort: '2025-11-11',
    image: "/src/assets/img/cafe.webp",
    categories: ["Unge", "Familie", "Andet", "Gratis"],
    specialLabel: "Ung i ODEON-rabat"
  },
  {
    id: 4,
    name: "KreaKafe",
    date: `${getWeekdayInDanish('2025-12-17')}, ${formatDate('2025-12-17')}`,
    dateForSort: '2025-12-17',
    image: "/src/assets/img/event3.webp",
    categories: ["Unge", "Familie", "Andet", "Gratis"],
    specialLabel: "Gratis"
  },
  {
    id: 5,
    name: "ODEONS Rytmiske kor",
    date: `${getWeekdayInDanish('2025-11-17')}, ${formatDate('2025-11-17')}`,
    dateForSort: '2025-11-17',
    image: "/src/assets/img/choir.jpg",
    categories: ["Unge", "Andet", "Gratis"],
    specialLabel: "Gratis"
  },
  {
    id: 6,
    name: "Julemarked",
    date: `${getWeekdayInDanish('2025-11-20')}, ${formatDate('2025-11-20')}`,
    dateForSort: '2025-11-20',
    image: "/src/assets/img/hero6.webp",
    categories: ["Unge", "Andet", "Gratis"],
    specialLabel: "Gratis"
  },
  {
    id: 7,
    name: "ODEONS Sangklub",
    date: `${getWeekdayInDanish('2025-11-17')}, ${formatDate('2025-11-17')}`,
    dateForSort: '2025-11-17',
    image: "/src/assets/img/hero1.jpg",
    categories: ["Unge", "Andet", "Gratis"],
    specialLabel: "Gratis"
  },
  {
    id: 8,
    name: "Kære Larsen",
    date: `${getWeekdayInDanish('2025-11-28')}, ${formatDate('2025-11-28')}`,
    dateForSort: '2025-11-28',
    image: "/src/assets/img/event2.webp",
    categories: ["Musik"]
  },
  {
    id: 9,
    name: "Ane Høgsberg",
    date: `${getWeekdayInDanish('2025-11-24')}, ${formatDate('2025-11-24')}`,
    dateForSort: '2025-11-24',
    image: "/src/assets/img/barselskomik.webp",
    categories: ["Unge", "Familie", "Comedy"]
  },
  {
    id: 10,
    name: "Word Festival 2026",
    date: `${getWeekdayInDanish('2026-01-30')}, ${formatDate('2026-01-30')}`,
    dateForSort: '2026-01-30',
    image: "/src/assets/img/wordfestival.webp",
    categories: ["Unge", "Andet"]
  },
  {
    id: 11,
    name: "Gobs",
    date: `${getWeekdayInDanish('2026-02-20')}, ${formatDate('2026-02-20')}`,
    dateForSort: '2026-02-20',
    image: "/src/assets/img/hero4.webp",
    categories: ["Unge", "Musik"]
  },
  {
    id: 12,
    name: "Magtens Korridorer",
    date: `${getWeekdayInDanish('2026-03-27')}, ${formatDate('2026-03-27')}`,
    dateForSort: '2026-03-27',
    image: "/src/assets/img/magtenskorridorer.webp",
    categories: ["Unge", "Musik"]
  },
  {
    id: 13,
    name: "Simon Talbot",
    date: `${getWeekdayInDanish('2026-05-05')}, ${formatDate('2026-05-05')}`,
    dateForSort: '2026-05-05',
    image: "/src/assets/img/simontalbot.webp",
    categories: ["Comedy", "Unge"]
  },
  {
    id: 14,
    name: "Wallmans on tour - Julefrokost",
    date: `${getWeekdayInDanish('2025-12-04')}, ${formatDate('2025-12-04')}`,
    dateForSort: '2025-12-04',
    image: "/src/assets/img/wallmans.webp",
    categories: ["Andet"]
  },
  {
    id: 15,
    name: "Tinkas Juleeventyr - musical",
    date: `${getWeekdayInDanish('2025-12-17')}, ${formatDate('2025-12-17')}`,
    dateForSort: '2025-12-17',
    image: "/src/assets/img/tinka.webp",
    categories: ["Familie", "Musical"]
  }
];

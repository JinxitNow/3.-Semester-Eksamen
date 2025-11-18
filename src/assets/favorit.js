//Dette script håndterer favoritter reaktivt i Vue og sørger for at 
// gemme ændringer i browseren, så de ikke forsvinder.//

import { ref } from "vue";

export const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || []);

export const toggleFavorite = (id) => {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter(f => f !== id);
  } else {
    favorites.value.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

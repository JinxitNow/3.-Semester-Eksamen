/* opsætter routing for Vue-projektet. Routing bestemmer, hvilken komponent 
der skal vises, når brugeren går til en bestemt URL.*/

import { createRouter, createWebHistory } from "vue-router";

import UngIOdeon from "../views/UngIOdeon.vue";
import Favorit from "../views/Favorit.vue";
import Login from "../views/Login.vue";
import LoginEvent from "../views/LoginEvent.vue";
import LoginDashboard from "../views/LoginDashboard.vue";
import Reminder from "../views/Reminder.vue";   // <-- NYT: import Reminder siden

const routes = [
  { path: "/", component: UngIOdeon },
  { path: "/favoritter", component: Favorit },
  { path: "/login", component: Login },
  { path: "/dashboard", component: LoginDashboard },
  { path: "/login-event", component: LoginEvent },

  { path: "/reminder", component: Reminder }    // <-- NYT: route til Reminder siden
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;

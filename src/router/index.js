/* opsætter routing for Vue-projektet. Routing bestemmer, hvilken komponent 
der skal vises, når brugeren går til en bestemt URL.*/

import { createRouter, createWebHistory } from "vue-router";
import Eventfeed from "../views/Eventfeed.vue";
import Favorit from "../views/Favorit.vue";
import Login from "../views/Login.vue";
import LoginEvent from "../views/LoginEvent.vue"; // <-- NYT

const routes = [
  { path: "/", component: Eventfeed },
  { path: "/favoritter", component: Favorit },
  { path: "/login", component: Login },
  { path: "/login-event", component: LoginEvent },
,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


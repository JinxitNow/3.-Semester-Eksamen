import { createRouter, createWebHistory } from "vue-router";

import UngIOdeon from "../views/UngIOdeon.vue";
import Favorit from "../views/Favorit.vue";
import Login from "../views/Login.vue";
import LoginEvent from "../views/LoginEvent.vue";
import LoginDashboard from "../views/LoginDashboard.vue";
import Reminder from "../views/Reminder.vue";
import EventDetail from "../views/EventDetail.vue";
import Terms from "../views/Terms.vue"; 

const routes = [
  { path: "/", name: "UngIOdeon", component: UngIOdeon },
  { path: "/favoritter", name: "Favoritter", component: Favoritter},
  { path: "/login", name: "Login", component: Login },
  { path: "/dashboard", name: "LoginDashboard", component: LoginDashboard },
  { path: "/login-event", name: "LoginEvent", component: LoginEvent },
  { path: "/reminder", name: "Reminder", component: Reminder },
  { path: "/event/:id", name: "EventDetail", component: EventDetail, props: true },
  { path: "/handelsbetingelser", name: "Terms", component: Terms },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;

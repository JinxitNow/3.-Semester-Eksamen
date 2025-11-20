import { createRouter, createWebHistory } from "vue-router";

import UngIOdeon from "../views/UngIOdeon.vue";
import Favorit from "../views/Favorit.vue";
import Login from "../views/Login.vue";
import LoginEvent from "../views/LoginEvent.vue";
import LoginDashboard from "../views/LoginDashboard.vue";
import Reminder from "../views/Reminder.vue";
import EventDetail from "../views/EventDetail.vue";

const routes = [
  { path: "/", component: UngIOdeon },
  { path: "/favoritter", component: Favorit },
  { path: "/login", component: Login },
  { path: "/dashboard", component: LoginDashboard },
  { path: "/login-event", component: LoginEvent },
  { path: "/reminder", component: Reminder },
  { path: "/event/:id", name: "EventDetail", component: EventDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

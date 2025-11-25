import { createRouter, createWebHistory } from "vue-router";

import UngIOdeon from "../views/UngIOdeon.vue";
import Favorit from "../views/Favorit.vue";
import Login from "../views/Login.vue";
import LoginEvent from "../views/LoginEvent.vue";
import LoginDashboard from "../views/LoginDashboard.vue";
import Reminder from "../views/Reminder.vue";
import EventDetail from "../views/EventDetail.vue";
import Terms from "../views/Terms.vue"; 
import EventGratis from "../views/EventGratis.vue";
import AdminRegistrations from "../views/LoginRegistration.vue"; 
import UpdateMember from "../views/UpdateMember.vue";
import LoginTutorialDashboard from "../views/LoginTutorialDashboard.vue";

const routes = [
  { path: "/", name: "UngIOdeon", component: UngIOdeon },
  { path: "/favoritter", name: "Favoritter", component: Favorit },
  { path: "/login", name: "Login", component: Login },
  { path: "/dashboard", name: "LoginDashboard", component: LoginDashboard },
  { path: "/login-event", name: "LoginEvent", component: LoginEvent },

  // ⭐ REMINDER SKAL HAVE ID
  { path: "/reminder/:id", name: "Reminder", component: Reminder, props: true },

  { path: "/event/:id", name: "EventDetail", component: EventDetail, props: true },
  { path: "/handelsbetingelser", name: "Terms", component: Terms },
  { path: "/events/gratis", name: "EventGratis", component: EventGratis },
  { path: "/medlem", name: "AdminRegistrations", component: AdminRegistrations },
  { path: "/update-member", name: "UpdateMember", component: UpdateMember },

  { path: "/tutorials", name: "LoginTutorialDashboard", component: LoginTutorialDashboard },
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

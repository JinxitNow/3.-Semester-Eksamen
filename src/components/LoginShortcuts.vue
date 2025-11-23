<template>
  <aside class="admin-sidebar">
    <nav>
      <ul>
        <li>
          <RouterLink to="/dashboard">
            <img src="/icons/dashboard.png" alt="Dashboard" class="icon" />
            Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/medlems">
            <img src="/icons/members.png" alt="Medlemsliste" class="icon" />
            Medlemsliste
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/login-event">
            <img src="/icons/events.png" alt="Events" class="icon" />
            Events
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/statistik">
            <img src="/icons/statistics.png" alt="Statistikker" class="icon" />
            Statistikker
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/vejledninger">
            <img src="/icons/manual.png" alt="Produktmanual" class="icon" />
            Produktmanual
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AdminSidebar',
  components: { RouterLink }
}
</script>

<style scoped>
/* Sidebar styles (desktop/tablet) */
.admin-sidebar {
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  width: 240px;
  background-color: #EFEFEF;
  padding-left: 3.8rem;
  padding-top: 3rem;
  padding-right: 1rem;
  z-index: 1000;
  border-radius: 0 16px 16px 0;
  box-shadow: 2px 0 6px rgba(0,0,0,0.1);
}

/* Mobil: skjul sidebar helt */
@media (max-width: 768px) {
  .admin-sidebar {
    display: none;
  }

  /* Fjern margin på main-indhold, så der ikke er hul */
  .main-content {
    margin-left: 0;
    padding-left: 1rem; /* valgfrit, så indhold ikke klistrer til kanten */
  }
}



.admin-sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.admin-sidebar nav ul li {
  margin-bottom: 1.2rem;
}

.admin-sidebar nav ul li a {
  text-decoration: none;
  color: #796535;
  font-weight: 300;
  font-size: 16px;
  display: block;
  transition: color 0.2s ease;
}

.admin-sidebar nav ul li a:hover {
  color: #947e4a;
}

/* Kun ikon-størrelse, ingen designændring */
.icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 6px;   /* afstand til teksten */
  position: relative;
  top: -2px;           /* rykker ikonet 2px op */
}

</style>

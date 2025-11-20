<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Genveje</h3>
        <ul>
          <li><a href="#">Om ODEON</a></li>
          <li><a href="#">Historie</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Mad og drikke</a></li>
          <li><a href="#">Konference og møder</a></li>
          <li><a href="#">Fester</a></li>
          <li><a href="#">Overnatning</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Kontakt</h3>
        <p>Odeons Kvarter 1<br />5000 Odense C</p>
        <p>Mail: <a href="mailto:odeon@comwell.com">odeon@comwell.com</a></p>
        <p>Telefon: <a href="tel:+4566147800">66 14 78 00</a></p>
        <p>CVR: 29516200</p>
      </div>

      <div class="footer-section">
        <h3>Åbningstider</h3>
        <p><strong>Café Odeon:</strong><br />Man–Fre: 08:00–18:00<br />Lør–Søn: 10:00–16:00</p>
        <p><strong>ODEON:</strong><br />Man–Fre: 08:00–22:00<br />Lør–Søn: 10:00–22:00</p>
      </div>

      <div class="footer-section">
        <h3>Politikker</h3>
        <ul>
          <li><a href="#">Privatlivspolitik</a></li>
          <li><a href="#">Cookiepolitik</a></li>
          <li><a href="#">Billedpolitik</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Følg med</h3>
        <ul>
          <li><a href="#">Presse</a></li>
          <li><a href="#">Nyhedsbrev</a></li>
        </ul>
        <div class="social-icons">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </div>
      </div>

      <!-- Samlet wrapper til sponsorat + møder -->
      <div class="footer-pair">
        <div class="footer-section">
          <h3>Sponsoraftale</h3>
          <p>ODEON er sponsoreret af Albani</p>
        </div>

        <div class="footer-section">
          <h3>Møder & konferencer</h3>
          <p>Mail: <a href="mailto:konference.odense@comwell.com">konference.odense@comwell.com</a></p>
          <p>Telefon: <a href="tel:+4566147800">66 14 78 00</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer {
  background-color: #efefef;
  padding: 40px 0;
  border-top: 1px solid #947E4A;
}

/* Mobile first: grid med 2 kolonner */
.footer-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Titler */
.footer-section h3 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 550px;
  color: #796535;
}

/* Tekst og links */
.footer-section p,
.footer-section li,
.footer-section a {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #796535;
}

.footer-section li {
  text-decoration: underline;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 6px;
}

.footer-section a {
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
}

.social-icons {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.social-icons a {
  font-size: 16px;
}

/* Wrapper til sponsorat + møder */
.footer-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Desktop: flex layout */
@media (min-width: 1024px) {
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
  }

  .footer-section {
    flex: 1 1 200px;
    min-width: 200px;
  }

  .footer-pair {
    display: flex;
    gap: 40px;
    width: 100%;
  }

  .footer-pair .footer-section {
    flex: 1 1 200px;
  }
}
</style>

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
          <a href="https://www.facebook.com/odeonodense" target="_blank" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91V127.41c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S293.3 0 262.24 0c-73.22 0-121.14 44.38-121.14 124.72v70.62H89.09V288h52.01v224h100.2V288z"/></svg>
          </a>
          <a href="https://www.instagram.com/odeonodense" target="_blank" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 190.7c-41.9 0-75.8-33.9-75.8-75.8s33.9-75.8 75.8-75.8 75.8 33.9 75.8 75.8-33.9 75.8-75.8 75.8zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-92.6S355.7 48.6 320 46.9c-35.7-1.7-142.3-1.7-178 0-35.7 1.7-67.3 9.9-92.6 36.2S48.6 156.3 46.9 192c-1.7 35.7-1.7 142.3 0 178 1.7 35.7 9.9 67.3 36.2 92.6s56.9 34.5 92.6 36.2c35.7 1.7 142.3 1.7 178 0 35.7-1.7 67.3-9.9 92.6-36.2s34.5-56.9 36.2-92.6c1.7-35.7 1.7-142.3 0-178zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"/></svg>
          </a>
        </div>
      </div>

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
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer {
  background-color: #f5f0e6;
  color: #3a2f2f;
  padding: 40px 20px;
  font-family: 'Open Sans', sans-serif;
}

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

.footer-section h3 {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 6px;
}

.footer-section a {
  color: #3a2f2f;
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
}

.social-icons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.social-icons svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill 0.3s ease;
}

.social-icons a:hover svg {
  fill: #7a5c5c;
}
</style>

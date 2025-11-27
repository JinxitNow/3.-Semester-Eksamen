<script>
import facebookImg from '../assets/img/facebook.webp?url'
import instagramImg from '../assets/img/instagram.webp?url'

export default {
  name: 'FooterComponent',
  data() {
    return {
      facebookImg,
      instagramImg,
    }
  }
};
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-container">
        <div class="footer-section">
          <h3>Åbningstider</h3>
          <p><strong>Café ODEON:</strong><br />Man–Fre: 08:00–18:00<br />Lør–Søn: 10:00–16:00</p>
          <p><strong>ODEON:</strong><br />Man–Fre: 08:00–22:00<br />Lør–Søn: 10:00–22:00</p>
        </div>

        <div class="footer-section contact-section">
          <h3>Kontakt</h3>
          <p>Odeons Kvarter 1<br />5000 Odense C</p>
          <p>Mail: <a href="mailto:odeon@comwell.com">odeon@comwell.com</a></p>
          <p>Telefon: <a href="tel:+4566147800">66 14 78 00</a></p>
          <p>CVR: 29516200</p>

          <div class="meetings-section">
            <h4>Møder & konferencer</h4>
            <p>Mail: <a href="mailto:konference.odense@comwell.com">konference.odense@comwell.com</a></p>
            <p>Telefon: <a href="tel:+4566147800">66 14 78 00</a></p>
          </div>
        </div>

        <div class="footer-section">
          <h3>Følg med</h3>
          <ul>
            <li><a href="#">Presse</a></li>
            <li><a href="#">Nyhedsbrev</a></li>
            <li><a href="https://www.instagram.com/odeonodense/?hl=da">@Odeonodense</a></li>
          </ul>
          <div class="social-icons">
            <a href="https://www.facebook.com/odeonodense/?locale=da_DK" target="_blank"><img :src="facebookImg" alt="Facebook" class="social-icon-img" /></a>
            <a href="https://www.instagram.com/odeonodense/?hl=da" target="_blank"><img :src="instagramImg" alt="Instagram" class="social-icon-img" /></a>
          </div>
        </div>

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
          <h3>Politikker</h3>
          <ul>
            <li><a href="#">Privatlivspolitik</a></li>
            <li><a href="#">Cookiepolitik</a></li>
            <li><a href="#">Billedpolitik</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Sponsoraftale</h3>
          <p>ODEON er sponsoreret af Albani</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #efefef;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.15);
  width: 100vw;          /* fylder hele viewport-bredden */
  position: relative;
  left: -3.8rem;          /* neutraliser global body padding */
}

.footer-inner {
  padding-left: 3.8rem;   /* behold indholdets padding */
  padding-right: 3.8rem;
  padding-top: 40px;      /* ekstra luft oppe */
  padding-bottom: 20px;
}

.footer-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

/* Sektionstitler */
.footer-section h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 550;
  color: #796535;
}

.footer-section h4 {
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 550;
  color: #796535;
}

/* Tekst og links */
.footer-section p,
.footer-section li,
.footer-section a {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
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
  font-size: 14px;
  display: inline-block;
}

.social-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Desktop: 6 kolonner */
@media (min-width: 1024px) {
  .footer-container {
    grid-template-columns: repeat(6, 1fr);
    gap: 40px;
  }

  .footer-section {
    min-width: 0;
  }

  .contact-section .meetings-section {
    margin-top: 10px;
  }

  /* Ekstra linjeafstand kun i Åbningstider-kolonnen */
  .footer-section:first-child p {
  line-height: 1.8;
}
}
</style>

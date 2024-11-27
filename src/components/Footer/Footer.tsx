import "./Footer.css";
import logo from "../../assets/logo.svg";
export const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__info">
        <div className="footer__contacts-container">
          <img
            src={logo}
            alt="Company Logo"
            className="footer__logo"
            aria-hidden="true"
          />
          <address className="footer__contacts">
            <a className="footer__contacts-phone" href="tel:+74959842513">
              +7 (495) 984 25 13
            </a>
            <a className="footer__contacts-email" href="mailto:info@neoflex.ru">
              info@neoflex.ru
            </a>
          </address>
        </div>
        <ul
          className="footer__learn-more-list"
          role="navigation"
          aria-label="Learn More"
        >
          <li className="footer__learn-more-item">
            <a href="">About bank</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Ask a Question</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Quality of service</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Requisites</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Press center</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Bank career</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Investors</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Analytics</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Business and processes</a>
          </li>
          <li className="footer__learn-more-item">
            <a href="">Compliance and business ethics</a>
          </li>
        </ul>
        <hr className="footer__hr" />
        <p className="footer__cookies-alert">
          We use cookies to personalize our services and improve the user
          experience of our website. Cookies are small files containing
          information about previous visits to a website. If you do not want to
          use cookies, please change your browser settings
        </p>
      </div>
    </footer>
  );
};


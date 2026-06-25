import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import GoldenDivider from '../ui/GoldenDivider';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container--wide">
        {/* Top Section */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-mark">GKG</span>
              <span className="footer__logo-text">Notary Public</span>
            </div>
            <p className="footer__tagline">
              Trusted notarial services in London since 1983.
              <br />
              M.B.E. awarded for services to British business.
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Navigation</h4>
            <nav className="footer__nav" aria-label="Footer navigation">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/services" className="footer__link">Services</Link>
              <Link to="/about" className="footer__link">About</Link>
              <Link to="/fees" className="footer__link">Fees</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
              <Link to="/what-is-a-notary" className="footer__link">What is a Notary</Link>
            </nav>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Kentish Town</h4>
            <div className="footer__address">
              <MapPin size={14} className="footer__address-icon" />
              <div>
                <p>59 Leighton Road</p>
                <p>Kentish Town, London</p>
                <p>NW5 2QH</p>
              </div>
            </div>

            <h4 className="footer__heading" style={{ marginTop: 'var(--space-xl)' }}>Green Lanes</h4>
            <div className="footer__address">
              <MapPin size={14} className="footer__address-icon" />
              <div>
                <p>717 Green Lanes</p>
                <p>London</p>
                <p>N21 3RX</p>
              </div>
            </div>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Get in Touch</h4>
            <a href="tel:07958083458" className="footer__contact-link">
              <Phone size={14} />
              <span>079 5808 3458</span>
            </a>
            <a href="mailto:info@gkgnotary.co.uk" className="footer__contact-link">
              <Mail size={14} />
              <span>info@gkgnotary.co.uk</span>
            </a>
            <Link to="/contact" className="footer__cta">
              Book Appointment
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <GoldenDivider width="100%" />

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} GKG Notary London. All rights reserved.
          </p>
          <div className="footer__legal">
            <span>Gopal Krishan Gupta M.B.E. — Notary Public</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

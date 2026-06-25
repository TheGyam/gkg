import { useRef, memo, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Award, Building2, Stamp, Globe, Shield, FileKey, Scale, PenTool } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import GoldenDivider from '../components/ui/GoldenDivider';
import { useCountUp, useInView as useCustomInView } from '../hooks';
import servicesData from '../data/services.json';
import './HomePage.css';

const iconMap = {
  stamp: Stamp, globe: Globe, building: Building2, 'shield-check': Shield,
  'file-key': FileKey, scale: Scale, 'pen-tool': PenTool, landmark: Building2,
};

/* ── Stat Counter — memoised to prevent re-render cascades ── */
const StatItem = memo(function StatItem({ number, suffix = '', label, delay = 0 }) {
  const [ref, isInView] = useCustomInView({ threshold: 0.3 });
  const count = useCountUp(parseInt(number), 2000, isInView);

  return (
    <div
      className={`stats__item fade-in-up ${isInView ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="stats__number">{count}{suffix}</span>
      <span className="stats__label">{label}</span>
    </div>
  );
});

/* ── CSS-driven fade-in section wrapper ── */
function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className={`fade-in-up ${isInView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ── Service card — memoised ── */
const ServiceCard = memo(function ServiceCard({ service, index }) {
  const IconComponent = iconMap[service.icon] || Stamp;
  return (
    <div
      className="service-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <span className="service-card__number">{service.number}</span>
      <div className="service-card__icon">
        <IconComponent size={28} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.shortDescription}</p>
      <Link to="/services" className="service-card__link">
        Learn more <ArrowRight size={14} />
      </Link>
    </div>
  );
});

const processSteps = [
  { num: '01', title: 'Get in Touch', desc: 'Call us or fill in the contact form to discuss your requirements. We provide immediate, helpful guidance.' },
  { num: '02', title: 'Prepare Documents', desc: 'We advise you on exactly what documents and identification to bring. No guesswork, no wasted trips.' },
  { num: '03', title: 'Visit Our Office', desc: 'Come to either our Kentish Town or Green Lanes office at a time that suits you. Walk-ins welcome.' },
  { num: '04', title: 'Notarisation Complete', desc: 'Your documents are authenticated, sealed, and ready. We can also handle FCDO apostille processing.' },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // GPU-composited transforms via Framer's useTransform — runs off main thread
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const services = useMemo(() => servicesData.services.slice(0, 6), []);

  return (
    <>
      <Helmet>
        <title>GKG Notary London — Trusted Notary Public Since 1983</title>
        <meta name="description" content="GKG Notary provides professional notarisation, legalisation, and document authentication services across London. Over 41 years of trusted service. M.B.E. awarded." />
      </Helmet>

      <main className="home">

        {/* ━━━ Section 1: Hero ━━━ */}
        <section className="hero" ref={heroRef}>
          <motion.div className="hero__bg" style={{ y: heroY, willChange: 'transform' }}>
            <div className="hero__grain" />
          </motion.div>
          <motion.div className="hero__content" style={{ opacity: heroOpacity, willChange: 'opacity' }}>
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Award size={14} />
              <span>M.B.E. Awarded · Queen's Honours 2018</span>
            </motion.div>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero__title-line">Notary</span>
              <span className="hero__title-line hero__title-line--accent">Public</span>
            </motion.h1>

            <motion.div
              className="hero__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span>London</span>
              <span className="hero__meta-dot" />
              <span>Est. 1983</span>
              <span className="hero__meta-dot" />
              <span>41+ Years</span>
            </motion.div>

            <motion.div
              className="hero__line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Professional notarial services for individuals and businesses.
              <br />
              Document authentication trusted worldwide.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <MagneticButton to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Book Appointment
              </MagneticButton>
              <MagneticButton to="/services" variant="outline" size="lg">
                Our Services
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span>Scroll</span>
            <div className="hero__scroll-line" />
          </motion.div>
        </section>

        {/* ━━━ Section 2: Narrative Introduction ━━━ */}
        <section className="narrative">
          <div className="container">
            <div className="narrative__grid">
              <div className="narrative__left">
                <AnimatedText
                  text="Forty-one years of trusted notarial service to London and beyond"
                  as="h2"
                  className="narrative__heading font-display"
                  staggerDelay={0.06}
                />
              </div>
              <div className="narrative__right">
                <RevealSection delay={0.2}>
                  <p className="narrative__text">
                    Under the direction of <strong>Gopal Krishan Gupta M.B.E.</strong>, GKG Notary has
                    established itself as one of London's most respected and experienced notarial practices.
                    We provide comprehensive authentication, legalisation, and documentation services from
                    our two conveniently located London offices.
                  </p>
                  <p className="narrative__text">
                    Whether your documents need authenticating for the Foreign &amp; Commonwealth Office,
                    or you require a simple affidavit — no matter if the task is large or small, basic
                    or complex — we handle it with the same meticulous care and professionalism.
                  </p>
                  <GoldenDivider width="80px" className="golden-divider--left" delay={0.5} />
                </RevealSection>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ Section 3: Services Ribbon ━━━ */}
        <section className="services-ribbon">
          <div className="container">
            <div className="services-ribbon__header">
              <RevealSection>
                <span className="services-ribbon__label">What We Do</span>
              </RevealSection>
              <AnimatedText
                text="Services Provided"
                as="h2"
                className="services-ribbon__title font-display"
              />
            </div>
          </div>

          <div className="services-ribbon__scroll">
            <div className="services-ribbon__track">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ Section 4: The Process ━━━ */}
        <section className="process">
          <div className="container">
            <div className="process__header">
              <RevealSection>
                <span className="process__label">How It Works</span>
              </RevealSection>
              <AnimatedText
                text="Simple, Straightforward Process"
                as="h2"
                className="process__title font-display"
              />
            </div>

            <div className="process__steps">
              {processSteps.map((step, i) => (
                <RevealSection key={step.num} delay={i * 0.1}>
                  <div className="process__step">
                    <div className="process__step-num">{step.num}</div>
                    <div className="process__step-connector" />
                    <div className="process__step-content">
                      <h3 className="process__step-title">{step.title}</h3>
                      <p className="process__step-desc">{step.desc}</p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ Section 5: Locations Split ━━━ */}
        <section className="locations">
          <div className="container">
            <div className="locations__header">
              <RevealSection>
                <span className="locations__label">Visit Us</span>
              </RevealSection>
              <AnimatedText
                text="Two Offices Across London"
                as="h2"
                className="locations__title font-display"
              />
            </div>

            <div className="locations__grid">
              <RevealSection>
                <div className="location-card">
                  <div className="location-card__badge">Primary Office</div>
                  <h3 className="location-card__name font-display">Kentish Town</h3>
                  <div className="location-card__details">
                    <div className="location-card__row">
                      <MapPin size={16} />
                      <div>
                        <p>59 Leighton Road</p>
                        <p>Kentish Town, London NW5 2QH</p>
                      </div>
                    </div>
                    <div className="location-card__row">
                      <Clock size={16} />
                      <p>5 min walk from Kentish Town Tube</p>
                    </div>
                  </div>
                  <div className="location-card__map-placeholder">
                    <MapPin size={32} />
                    <span>Interactive map</span>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={0.15}>
                <div className="location-card">
                  <h3 className="location-card__name font-display">Green Lanes</h3>
                  <div className="location-card__details">
                    <div className="location-card__row">
                      <MapPin size={16} />
                      <div>
                        <p>717 Green Lanes</p>
                        <p>London N21 3RX</p>
                      </div>
                    </div>
                    <div className="location-card__row">
                      <Clock size={16} />
                      <p>8 min walk from Winchmore Hill Rail</p>
                    </div>
                  </div>
                  <div className="location-card__map-placeholder">
                    <MapPin size={32} />
                    <span>Interactive map</span>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ━━━ Section 6: Stats ━━━ */}
        <section className="stats">
          <div className="container">
            <div className="stats__grid">
              <StatItem number="41" suffix="+" label="Years of Service" delay={0} />
              <StatItem number="2" label="London Offices" delay={0.1} />
              <StatItem number="2018" suffix="" label="M.B.E. Awarded" delay={0.2} />
              <StatItem number="1000" suffix="s" label="Documents Notarised" delay={0.3} />
            </div>
          </div>
        </section>

        {/* ━━━ Section 7: CTA ━━━ */}
        <section className="home-cta">
          <div className="container">
            <RevealSection className="home-cta__content">
              <AnimatedText
                text="Begin Your Notarisation"
                as="h2"
                className="home-cta__title font-display"
              />
              <p className="home-cta__text">
                Contact us today to discuss your requirements. We offer a hands-on,
                friendly service with competitive fees and fast turnaround.
              </p>
              <div className="home-cta__actions">
                <MagneticButton to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                  Get in Touch
                </MagneticButton>
                <a href="tel:07958083458" className="home-cta__phone">
                  Or call: 079 5808 3458
                </a>
              </div>
            </RevealSection>
          </div>
        </section>

      </main>
    </>
  );
}

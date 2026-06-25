import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Award, Phone, ArrowRight } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import GoldenDivider from '../components/ui/GoldenDivider';
import aboutData from '../data/about.json';
import './AboutPage.css';

export default function AboutPage() {
  const { notary, milestones } = aboutData;

  return (
    <>
      <Helmet>
        <title>About — GKG Notary London</title>
        <meta name="description" content={`${notary.name} ${notary.honorific} — ${notary.yearsExperience}+ years as a Notary Public in London. Awarded M.B.E. for services to British business.`} />
      </Helmet>

      <main className="about-page">
        {/* Hero */}
        <section className="about-page__hero">
          <div className="container">
            <motion.span
              className="about-page__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About the Practice
            </motion.span>
            <AnimatedText
              text={`${notary.name}`}
              as="h1"
              className="about-page__title font-display"
              delay={0.3}
            />
            <motion.div
              className="about-page__honorific"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Award size={16} />
              <span>{notary.honorific}</span>
            </motion.div>
            <GoldenDivider width="120px" delay={1} />
          </div>
        </section>

        {/* Profile */}
        <section className="about-profile">
          <div className="container">
            <div className="about-profile__grid">
              <div className="about-profile__portrait">
                <div className="about-profile__portrait-placeholder">
                  <span className="about-profile__portrait-initials font-display">GKG</span>
                  <span className="about-profile__portrait-text">Portrait</span>
                </div>
              </div>

              <div className="about-profile__content">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="about-profile__role font-display">{notary.title}</h2>
                  <p className="about-profile__bio">{notary.bio}</p>
                  <p className="about-profile__bio">{notary.extendedBio}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* MBE Highlight */}
        <section className="about-mbe">
          <div className="container">
            <motion.div
              className="about-mbe__card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="about-mbe__icon">
                <Award size={48} />
              </div>
              <div className="about-mbe__content">
                <h3 className="about-mbe__title font-display">Member of the Order of the British Empire</h3>
                <p className="about-mbe__text">{notary.mbeDetails}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Personal */}
        <section className="about-personal">
          <div className="container container--narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="about-personal__text">{notary.personalNote}</p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="about-timeline">
          <div className="container">
            <div className="about-timeline__header">
              <AnimatedText
                text="Our Journey"
                as="h2"
                className="about-timeline__title font-display"
              />
            </div>

            <div className="about-timeline__track">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="timeline-item__year font-display">{milestone.year}</span>
                  <div className="timeline-item__dot" />
                  <p className="timeline-item__event">{milestone.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <div className="container">
            <motion.div
              className="about-cta__content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="about-cta__title font-display">Work With Us</h2>
              <p className="about-cta__text">
                Experience the difference that {notary.yearsExperience}+ years of dedicated
                service makes. Contact us today.
              </p>
              <div className="about-cta__actions">
                <MagneticButton to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                  Get in Touch
                </MagneticButton>
                <a href={`tel:${notary.phone}`} className="about-cta__phone">
                  <Phone size={16} />
                  {notary.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

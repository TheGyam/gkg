import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronDown, Stamp, Globe, Building2, Shield, FileKey, Scale, PenTool } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import GoldenDivider from '../components/ui/GoldenDivider';
import servicesData from '../data/services.json';
import './ServicesPage.css';

const iconMap = {
  stamp: Stamp, globe: Globe, building: Building2, 'shield-check': Shield,
  'file-key': FileKey, scale: Scale, 'pen-tool': PenTool, landmark: Building2,
};

function ServiceAccordion({ service, isOpen, onToggle, index }) {
  const IconComponent = iconMap[service.icon] || Stamp;

  return (
    <motion.div
      className={`service-accordion ${isOpen ? 'service-accordion--open' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        className="service-accordion__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="service-accordion__left">
          <span className="service-accordion__number">{service.number}</span>
          <div className="service-accordion__icon">
            <IconComponent size={24} />
          </div>
          <h3 className="service-accordion__title font-display">{service.title}</h3>
        </div>
        <div className="service-accordion__right">
          <span className="service-accordion__short">{service.shortDescription}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} className="service-accordion__chevron" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="service-accordion__content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="service-accordion__inner">
              <div className="service-accordion__description">
                <p>{service.fullDescription}</p>
              </div>
              <div className="service-accordion__features">
                <h4 className="service-accordion__features-title">What's Included</h4>
                <ul className="service-accordion__features-list">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <MagneticButton to="/contact" variant="outline" size="sm" icon={ArrowRight}>
                  Enquire About This Service
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [openId, setOpenId] = useState(null);
  const services = servicesData.services;

  return (
    <>
      <Helmet>
        <title>Services — GKG Notary London</title>
        <meta name="description" content="Comprehensive notary services including notarisation, legalisation, company documentation, identity verification, power of attorney, and more." />
      </Helmet>

      <main className="services-page">
        <section className="services-page__hero">
          <div className="container">
            <motion.span
              className="services-page__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Expertise
            </motion.span>
            <AnimatedText
              text="Services Provided"
              as="h1"
              className="services-page__title font-display"
              delay={0.3}
            />
            <motion.p
              className="services-page__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              We offer a comprehensive range of notarial services to individuals and
              businesses across London and internationally.
            </motion.p>
            <GoldenDivider width="120px" delay={1} />
          </div>
        </section>

        <section className="services-page__list">
          <div className="container">
            {services.map((service, i) => (
              <ServiceAccordion
                key={service.id}
                service={service}
                isOpen={openId === service.id}
                onToggle={() => setOpenId(openId === service.id ? null : service.id)}
                index={i}
              />
            ))}
          </div>
        </section>

        <section className="services-page__cta">
          <div className="container">
            <motion.div
              className="services-page__cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display">Need Something Specific?</h2>
              <p>We handle bespoke notarial requirements. Get in touch to discuss your needs.</p>
              <MagneticButton to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Contact Us
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

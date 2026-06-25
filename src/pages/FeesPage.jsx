import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import GoldenDivider from '../components/ui/GoldenDivider';
import feesData from '../data/fees.json';
import './FeesPage.css';

export default function FeesPage() {
  const { pricing, packages } = feesData;

  return (
    <>
      <Helmet>
        <title>Fees — GKG Notary London</title>
        <meta name="description" content="Transparent notary fees starting from £80 + VAT per document. Competitive pricing for all notarial services in London." />
      </Helmet>

      <main className="fees-page">
        <section className="fees-page__hero">
          <div className="container">
            <motion.span
              className="fees-page__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Transparent Pricing
            </motion.span>
            <AnimatedText
              text="Our Fees"
              as="h1"
              className="fees-page__title font-display"
              delay={0.3}
            />
            <motion.p
              className="fees-page__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Simple, competitive pricing with no hidden costs.
              We always provide the best possible rates.
            </motion.p>
            <GoldenDivider width="120px" delay={1} />
          </div>
        </section>

        {/* Base Rate */}
        <section className="fees-base">
          <div className="container container--narrow">
            <motion.div
              className="fees-base__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="fees-base__label">Starting From</span>
              <div className="fees-base__price">
                <span className="fees-base__currency">£</span>
                <span className="fees-base__amount font-display">{pricing.baseRate.amount}</span>
                <span className="fees-base__vat">+ VAT (£{pricing.baseRate.vatAmount})</span>
              </div>
              <span className="fees-base__per">{pricing.baseRate.per}</span>
              <div className="fees-base__total">
                Total: <strong>£{pricing.baseRate.total}</strong> per document
              </div>
            </motion.div>
          </div>
        </section>

        {/* Packages */}
        <section className="fees-packages">
          <div className="container">
            <div className="fees-packages__header">
              <AnimatedText
                text="Service Packages"
                as="h2"
                className="fees-packages__title font-display"
              />
            </div>

            <div className="fees-packages__grid">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  className={`fee-card ${pkg.popular ? 'fee-card--popular' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {pkg.popular && <div className="fee-card__badge">Most Popular</div>}
                  <h3 className="fee-card__name font-display">{pkg.name}</h3>
                  <p className="fee-card__desc">{pkg.description}</p>
                  <div className="fee-card__price">
                    <span className="fee-card__currency">£</span>
                    <span className="fee-card__amount">{pkg.price}</span>
                    <span className="fee-card__vat">+ VAT</span>
                  </div>
                  <div className="fee-card__total">Total: £{pkg.total}</div>
                  <ul className="fee-card__features">
                    {pkg.features.map((feature, j) => (
                      <li key={j}>
                        <Check size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton
                    to="/contact"
                    variant={pkg.popular ? 'primary' : 'outline'}
                    size="md"
                    icon={ArrowRight}
                    className="fee-card__cta"
                  >
                    Get Started
                  </MagneticButton>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="fees-notes">
          <div className="container container--narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="fees-notes__title font-display">Important Information</h3>
              <ul className="fees-notes__list">
                {pricing.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="fees-cta">
          <div className="container">
            <motion.div
              className="fees-cta__content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display">Need a Custom Quote?</h2>
              <p>For complex matters or multiple documents, we provide detailed costings upon request.</p>
              <MagneticButton to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Request a Quote
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

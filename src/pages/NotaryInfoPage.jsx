import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ArrowRight } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import GoldenDivider from '../components/ui/GoldenDivider';
import './NotaryInfoPage.css';

const faqItems = [
  {
    q: 'What exactly does a Notary Public do?',
    a: 'A Notary Public is a legally licensed professional who serves as an impartial witness to verify the authenticity of signatures, administer oaths, and certify documents for use both domestically and internationally. They ensure documents carry full legal weight.',
  },
  {
    q: 'When would I need a Notary?',
    a: 'You may need a Notary for international business transactions, property purchases abroad, immigration documents, powers of attorney for overseas use, authenticating identity documents, company documentation for foreign jurisdictions, and many other situations requiring certified documents.',
  },
  {
    q: 'Is a Notary the same as a Solicitor?',
    a: 'No. While both are legal professionals, a Notary Public specialises in the authentication and certification of documents, particularly for international use. Notaries hold a separate appointment from the Court of Faculties and have specific powers that solicitors do not.',
  },
  {
    q: 'What documents should I bring?',
    a: 'You should bring the document(s) requiring notarisation, valid photographic identification (passport or driving licence), and proof of address. For specific requirements, contact us beforehand and we will advise you precisely what is needed.',
  },
  {
    q: 'How long does notarisation take?',
    a: 'Standard notarisation of a single document typically takes 15-30 minutes. More complex matters may require additional time. We also offer same-day express services for urgent requirements.',
  },
  {
    q: 'What is an Apostille?',
    a: 'An Apostille is a certificate issued by the FCDO (Foreign, Commonwealth & Development Office) that authenticates a notarised document for use in countries that are members of the Hague Convention. We can handle the entire apostille process on your behalf.',
  },
];

export default function NotaryInfoPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>What is a Notary — GKG Notary London</title>
        <meta name="description" content="Learn about notary public services, what they do, when you need one, and how the notarisation process works. Comprehensive guide by GKG Notary London." />
      </Helmet>

      <main className="notary-info-page">
        <section className="notary-info__hero">
          <div className="container">
            <motion.span
              className="notary-info__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Knowledge Centre
            </motion.span>
            <AnimatedText
              text="What is a Notary?"
              as="h1"
              className="notary-info__title font-display"
              delay={0.3}
            />
            <GoldenDivider width="120px" delay={1} />
          </div>
        </section>

        {/* Editorial Content */}
        <section className="notary-content">
          <div className="container container--narrow">
            <motion.div
              className="notary-content__lead"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="notary-content__drop-cap">
                A Notary Public is a qualified legal professional, appointed by the Court
                of Faculties of the Archbishop of Canterbury, who serves as an impartial
                witness to the signing of important documents and verifies the identity of
                the signatories. The office of Notary Public is one of the oldest in
                English law, with roots dating back to the Roman Empire.
              </p>
            </motion.div>

            <motion.div
              className="notary-content__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display">The Role of a Notary Public</h2>
              <p>
                The principal function of a notary public is to verify the identification
                of individuals participating in a transaction. Notaries perform the task
                of verifying the legitimacy of individuals' identities by carefully
                examining government-issued identity documents.
              </p>
              <p>
                Beyond identity verification, notaries authenticate documents by affixing
                their official seal and signature, thereby attesting to their witnessing
                of the signing procedure and verifying the document's legitimacy. This
                certification carries substantial significance within the framework of
                legal proceedings.
              </p>
            </motion.div>

            <motion.div
              className="notary-content__pullquote"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <blockquote>
                "Having a document correctly notarised and then registered can make
                the difference to its legal standing."
              </blockquote>
            </motion.div>

            <motion.div
              className="notary-content__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display">Documents That Can Be Notarised</h2>
              <div className="notary-content__grid">
                <div className="notary-content__card">
                  <h3>Real Estate</h3>
                  <p>Deeds, mortgages, property transfers, and land registry documentation.</p>
                </div>
                <div className="notary-content__card">
                  <h3>Legal Contracts</h3>
                  <p>Commercial contracts, wills, powers of attorney, and partnership agreements.</p>
                </div>
                <div className="notary-content__card">
                  <h3>Financial Documents</h3>
                  <p>Loan agreements, promissory notes, and banking documentation.</p>
                </div>
                <div className="notary-content__card">
                  <h3>Affidavits</h3>
                  <p>Sworn statements, statutory declarations, and formal affirmations.</p>
                </div>
                <div className="notary-content__card">
                  <h3>Identity Documents</h3>
                  <p>Certified copies of passports, visas, and identification papers.</p>
                </div>
                <div className="notary-content__card">
                  <h3>Corporate</h3>
                  <p>Board resolutions, articles of association, and company certificates.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="notary-content__section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display">Fraud Prevention</h2>
              <p>
                Notaries fulfil a vital function in the prevention and mitigation of
                fraudulent activities. Through proactive observation and attestation of
                document signatures, the risk of forgeries and fraudulent activities is
                significantly reduced. The preservation of the integrity of legal
                contracts is of utmost significance in today's global business environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="notary-faq">
          <div className="container container--narrow">
            <div className="notary-faq__header">
              <AnimatedText
                text="Frequently Asked Questions"
                as="h2"
                className="notary-faq__title font-display"
              />
            </div>

            <div className="notary-faq__list">
              {faqItems.map((faq, i) => (
                <motion.div
                  key={i}
                  className="faq-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <button
                    className="faq-item__trigger"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} className="faq-item__icon" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="faq-item__answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="notary-info-cta">
          <div className="container">
            <motion.div
              className="notary-info-cta__content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display">Need a Notary?</h2>
              <p>With 41+ years of experience, GKG Notary London is here to help with all your notarial needs.</p>
              <MagneticButton to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Book an Appointment
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

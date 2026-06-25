import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import GoldenDivider from '../components/ui/GoldenDivider';
import locationsData from '../data/locations.json';
import './ContactPage.css';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Please provide more detail about your requirements'),
});

export default function ContactPage() {
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success
  const { locations, contactInfo } = locationsData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setSubmitState('loading');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('[Contact Form]', data);
    setSubmitState('success');
    setTimeout(() => {
      setSubmitState('idle');
      reset();
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact — GKG Notary London</title>
        <meta name="description" content="Contact GKG Notary London for all your notarisation needs. Two offices in Kentish Town and Green Lanes. Call 07958083458." />
      </Helmet>

      <main className="contact-page">
        <section className="contact-page__hero">
          <div className="container">
            <motion.span
              className="contact-page__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get in Touch
            </motion.span>
            <AnimatedText
              text="Contact Us"
              as="h1"
              className="contact-page__title font-display"
              delay={0.3}
            />
            <GoldenDivider width="120px" delay={1} />
          </div>
        </section>

        <section className="contact-main">
          <div className="container">
            <div className="contact-main__grid">
              {/* Form */}
              <motion.div
                className="contact-form-wrapper"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="contact-form__heading font-display">Send an Enquiry</h2>
                <p className="contact-form__intro">
                  Fill in the form below and we will get back to you promptly.
                </p>

                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-field">
                    <label htmlFor="contact-name" className="form-field__label">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      className={`form-field__input ${errors.name ? 'form-field__input--error' : ''}`}
                      placeholder="Your full name"
                      {...register('name')}
                    />
                    {errors.name && <span className="form-field__error">{errors.name.message}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-email" className="form-field__label">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      className={`form-field__input ${errors.email ? 'form-field__input--error' : ''}`}
                      placeholder="your@email.com"
                      {...register('email')}
                    />
                    {errors.email && <span className="form-field__error">{errors.email.message}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-phone" className="form-field__label">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="form-field__input"
                      placeholder="Your phone number"
                      {...register('phone')}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-service" className="form-field__label">Service Required</label>
                    <select id="contact-service" className="form-field__input" {...register('service')}>
                      <option value="">Select a service</option>
                      <option value="notarisation">Notarisation</option>
                      <option value="legalisation">Legalisation</option>
                      <option value="company-docs">Company Documentation</option>
                      <option value="identity-verification">Identity Verification</option>
                      <option value="power-of-attorney">Power of Attorney</option>
                      <option value="affidavits">Affidavits & Declarations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-field form-field--full">
                    <label htmlFor="contact-message" className="form-field__label">Your Message *</label>
                    <textarea
                      id="contact-message"
                      className={`form-field__input form-field__textarea ${errors.message ? 'form-field__input--error' : ''}`}
                      placeholder="Please describe your requirements..."
                      rows={5}
                      {...register('message')}
                    />
                    {errors.message && <span className="form-field__error">{errors.message.message}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className={`contact-submit contact-submit--${submitState}`}
                    disabled={submitState !== 'idle'}
                    whileTap={{ scale: 0.97 }}
                  >
                    {submitState === 'idle' && (
                      <>
                        <Send size={16} />
                        <span>Send Enquiry</span>
                      </>
                    )}
                    {submitState === 'loading' && (
                      <div className="contact-submit__spinner" />
                    )}
                    {submitState === 'success' && (
                      <>
                        <CheckCircle size={16} />
                        <span>Sent Successfully!</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Info Sidebar */}
              <motion.div
                className="contact-info"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="contact-info__block">
                  <h3 className="contact-info__heading">Direct Contact</h3>
                  <a href={`tel:${contactInfo.phone}`} className="contact-info__link">
                    <Phone size={16} />
                    <span>{contactInfo.phone}</span>
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="contact-info__link">
                    <Mail size={16} />
                    <span>{contactInfo.email}</span>
                  </a>
                </div>

                {locations.map((loc) => (
                  <div key={loc.id} className="contact-info__block">
                    <h3 className="contact-info__heading">
                      {loc.name}
                      {loc.isPrimary && <span className="contact-info__primary">Primary</span>}
                    </h3>
                    <div className="contact-info__address">
                      <MapPin size={14} />
                      <div>
                        <p>{loc.address.line1}</p>
                        {loc.address.area && <p>{loc.address.area}</p>}
                        <p>{loc.address.city} {loc.address.postcode}</p>
                      </div>
                    </div>
                    <div className="contact-info__transport">
                      <Clock size={14} />
                      <span>{loc.walkTime} from {loc.nearestStation} {loc.transportType}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

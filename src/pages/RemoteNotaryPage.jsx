import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, CheckCircle, Shield, FileSignature, UploadCloud, AlertCircle } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import GoldenDivider from '../components/ui/GoldenDivider';
import MagneticButton from '../components/ui/MagneticButton';
import FileUpload from '../components/ui/FileUpload';
import api from '../api/services';
import './RemoteNotaryPage.css';

// Form Validation Schema
const detailsSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  serviceType: z.string().min(1, 'Please select a service type'),
  instructions: z.string().optional(),
});

const steps = [
  { id: 'details', title: 'Your Details', icon: FileSignature },
  { id: 'upload', title: 'Upload Documents', icon: UploadCloud },
  { id: 'review', title: 'Review & Submit', icon: Shield },
];

export default function RemoteNotaryPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(detailsSchema),
    mode: 'onTouched',
  });

  const nextStep = async () => {
    // Validate current step
    if (currentStep === 0) {
      const isValid = await trigger();
      if (!isValid) return;
    }

    if (currentStep === 1) {
      if (files.length === 0) {
        setUploadError('Please upload at least one document.');
        return;
      }
      setUploadError('');
    }

    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async () => {
    const formData = getValues();
    setSubmitState('loading');

    try {
      // Create FormData for multipart submission
      const payload = new FormData();
      Object.keys(formData).forEach(key => payload.append(key, formData[key]));
      files.forEach(file => payload.append('documents', file));

      // Call API
      await api.submitRemoteNotarisation(payload);
      
      setSubmitState('success');
      
      // Keep it on the success state, no redirect needed

    } catch (error) {
      console.error('Submission failed', error);
      setSubmitState('idle');
      // In a real app, show error toast here
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="remote-form__section">
            <h3 className="remote-form__title font-display">Personal Information</h3>
            <p className="remote-form__subtitle">Please provide your details to begin the remote notarisation process.</p>
            
            <div className="remote-form__grid">
              <div className="form-field">
                <label className="form-field__label">First Name *</label>
                <input
                  type="text"
                  className={`form-field__input ${errors.firstName ? 'form-field__input--error' : ''}`}
                  placeholder="John"
                  {...register('firstName')}
                />
                {errors.firstName && <span className="form-field__error">{errors.firstName.message}</span>}
              </div>
              <div className="form-field">
                <label className="form-field__label">Last Name *</label>
                <input
                  type="text"
                  className={`form-field__input ${errors.lastName ? 'form-field__input--error' : ''}`}
                  placeholder="Doe"
                  {...register('lastName')}
                />
                {errors.lastName && <span className="form-field__error">{errors.lastName.message}</span>}
              </div>
              <div className="form-field">
                <label className="form-field__label">Email Address *</label>
                <input
                  type="email"
                  className={`form-field__input ${errors.email ? 'form-field__input--error' : ''}`}
                  placeholder="john@example.com"
                  {...register('email')}
                />
                {errors.email && <span className="form-field__error">{errors.email.message}</span>}
              </div>
              <div className="form-field">
                <label className="form-field__label">Phone Number *</label>
                <input
                  type="tel"
                  className={`form-field__input ${errors.phone ? 'form-field__input--error' : ''}`}
                  placeholder="+44 7000 000000"
                  {...register('phone')}
                />
                {errors.phone && <span className="form-field__error">{errors.phone.message}</span>}
              </div>
              <div className="form-field form-field--full">
                <label className="form-field__label">Service Type *</label>
                <select className={`form-field__input ${errors.serviceType ? 'form-field__input--error' : ''}`} {...register('serviceType')}>
                  <option value="">Select a service</option>
                  <option value="affidavit">Affidavits & Declarations</option>
                  <option value="power-of-attorney">Power of Attorney</option>
                  <option value="commercial">Commercial Documents</option>
                  <option value="real-estate">Real Estate & Property</option>
                  <option value="other">Other Remote Service</option>
                </select>
                {errors.serviceType && <span className="form-field__error">{errors.serviceType.message}</span>}
              </div>
              <div className="form-field form-field--full">
                <label className="form-field__label">Additional Instructions</label>
                <textarea
                  className="form-field__input form-field__textarea"
                  placeholder="Any specific requirements or context..."
                  rows={3}
                  {...register('instructions')}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="remote-form__section">
            <h3 className="remote-form__title font-display">Upload Documents</h3>
            <p className="remote-form__subtitle">Upload the documents that require notarisation. Our secure portal supports PDF, Word, and Image formats.</p>
            
            <div className="remote-form__upload-area">
              <FileUpload files={files} onFilesChange={setFiles} maxFiles={10} />
              {uploadError && (
                <div className="remote-form__upload-error">
                  <AlertCircle size={16} />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        const data = getValues();
        return (
          <div className="remote-form__section">
            <h3 className="remote-form__title font-display">Review & Submit</h3>
            <p className="remote-form__subtitle">Please review your details. Upon submission, our notary team will review your documents and contact you to complete the process.</p>
            
            <div className="remote-form__summary">
              <div className="remote-form__summary-block">
                <h4>Signatory Details</h4>
                <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Phone:</strong> {data.phone}</p>
                <p><strong>Service:</strong> {data.serviceType}</p>
              </div>
              <div className="remote-form__summary-block">
                <h4>Documents ({files.length})</h4>
                <ul className="remote-form__summary-files">
                  {files.map((f, i) => (
                    <li key={i}>
                      <FileSignature size={14} /> {f.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {submitState === 'success' && (
              <motion.div 
                className="remote-form__success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={20} />
                <span>Application submitted successfully. We will be in touch shortly.</span>
              </motion.div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Remote Notarisation — GKG Notary London</title>
        <meta name="description" content="Secure online document submission and e-Notary services via DocuSign. Fast, remote notarisation for individuals and businesses." />
      </Helmet>

      <main className="remote-page">
        <section className="remote-hero">
          <div className="container">
            <motion.span
              className="remote-hero__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Online Portal
            </motion.span>
            <AnimatedText
              text="Remote Notarisation"
              as="h1"
              className="remote-hero__title font-display"
              delay={0.3}
            />
            <motion.p
              className="remote-hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Submit your documents securely online. Our team will review your 
              submission and prepare the necessary notarisation workflow for you.
            </motion.p>
            <GoldenDivider width="120px" delay={1} />
          </div>
        </section>

        <section className="remote-wizard">
          <div className="container container--narrow">
            <div className="wizard-container">
              
              {/* Progress Stepper */}
              <div className="wizard-steps">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <div 
                      key={step.id} 
                      className={`wizard-step ${isActive ? 'wizard-step--active' : ''} ${isCompleted ? 'wizard-step--completed' : ''}`}
                    >
                      <div className="wizard-step__indicator">
                        {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                      </div>
                      <span className="wizard-step__title">{step.title}</span>
                      {index < steps.length - 1 && <div className="wizard-step__line" />}
                    </div>
                  );
                })}
              </div>

              {/* Form Content */}
              <div className="wizard-content-wrapper">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="wizard-content"
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="wizard-controls">
                {currentStep > 0 ? (
                  <button type="button" className="wizard-btn wizard-btn--secondary" onClick={prevStep} disabled={submitState !== 'idle'}>
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <div /> // Spacer
                )}

                {currentStep < steps.length - 1 ? (
                  <button type="button" className="wizard-btn wizard-btn--primary" onClick={nextStep}>
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <MagneticButton 
                    variant="primary" 
                    onClick={onSubmit} 
                    disabled={submitState !== 'idle'}
                    className={submitState === 'success' ? 'btn-success' : ''}
                  >
                    {submitState === 'loading' ? (
                      <div className="spinner-border" />
                    ) : submitState === 'success' ? (
                      <>Submitted <CheckCircle size={16} /></>
                    ) : (
                      <>Submit Application <ArrowRight size={16} /></>
                    )}
                  </MagneticButton>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

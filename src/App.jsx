import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Eager imports — bundle is ~125KB gzipped, lazy loading adds
// a Suspense boundary + code-split waterfall that causes visual jank
// on every navigation. Not worth it for this bundle size.
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import FeesPage from './pages/FeesPage';
import ContactPage from './pages/ContactPage';
import NotaryInfoPage from './pages/NotaryInfoPage';
import RemoteNotaryPage from './pages/RemoteNotaryPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // requestAnimationFrame ensures the browser paints the new route 
    // before we force the scroll position, fixing the issue on mobile Safari/Chrome
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 0);
    });
  }, [pathname]);

  return null;
}

/**
 * Page wrapper — pure CSS opacity transition via class toggle.
 * No exit animation = no blank frame between routes.
 */
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ willChange: 'opacity' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/what-is-a-notary" element={<NotaryInfoPage />} />
          <Route path="/remote-notary" element={<RemoteNotaryPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </HashRouter>
    </HelmetProvider>
  );
}

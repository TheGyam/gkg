import { motion } from 'framer-motion';
import './GoldenDivider.css';

/**
 * GoldenDivider — Animated gold line divider
 */
export default function GoldenDivider({ width = '120px', className = '', delay = 0 }) {
  return (
    <div className={`golden-divider ${className}`}>
      <motion.div
        className="golden-divider__line"
        style={{ width }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

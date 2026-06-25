import { useRef } from 'react';
import { useInView } from 'framer-motion';
import './AnimatedText.css';

/**
 * AnimatedText — Reveals text word-by-word using CSS animations.
 *
 * Performance: Uses a single IntersectionObserver via Framer's useInView,
 * then toggles a CSS class. Each word animates via CSS @keyframes with
 * staggered animation-delay — no per-word React state or motion.span.
 * This means 1 observer and 0 Framer animation instances per heading.
 */
export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  splitBy = 'word',
  once = true,
  staggerDelay = 0.04,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  if (splitBy === 'word') {
    const words = text.split(' ');
    return (
      <Tag
        className={`anim-text ${isInView ? 'anim-text--visible' : ''} ${className}`}
        ref={ref}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span key={i} className="anim-text__mask">
            <span
              className="anim-text__word"
              style={{ animationDelay: `${delay + i * staggerDelay}s` }}
              aria-hidden="true"
            >
              {word}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  // Line animation
  return (
    <Tag
      className={`anim-text ${isInView ? 'anim-text--visible' : ''} ${className}`}
      ref={ref}
    >
      <span
        className="anim-text__line"
        style={{ animationDelay: `${delay}s` }}
      >
        {text}
      </span>
    </Tag>
  );
}

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import './MagneticButton.css';

/**
 * MagneticButton — Button that subtly moves toward the cursor on hover.
 * 
 * Performance: Uses useMotionValue + useSpring instead of useState.
 * This bypasses React re-renders entirely — the spring animation
 * runs in Framer Motion's internal animation loop, not React state.
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  type = 'button',
  disabled = false,
  ...props
}) {
  const ref = useRef(null);

  // Motion values bypass React state — zero re-renders on mouse move
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const buttonContent = (
    <>
      <span className="magnetic-btn__text">{children}</span>
      {Icon && <Icon className="magnetic-btn__icon" size={18} />}
    </>
  );

  const motionProps = {
    ref,
    className: `magnetic-btn magnetic-btn--${variant} magnetic-btn--${size} ${className}`,
    onMouseMove: handleMouse,
    onMouseLeave: handleLeave,
    style: { x: springX, y: springY },
    whileTap: { scale: 0.97 },
    ...props,
  };

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className="magnetic-btn__link">
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...motionProps}>
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...motionProps}>
      {buttonContent}
    </motion.button>
  );
}

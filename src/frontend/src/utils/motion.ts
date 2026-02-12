// Centralized motion configuration with 0.5s transition duration constants
// Note: This app uses CSS animations instead of Framer Motion
export const MOTION_DURATION = 0.5;

export const MOTION_TRANSITION = {
  duration: MOTION_DURATION,
  ease: "ease-out",
};

// CSS animation class names for consistent timing
export const ANIMATION_CLASSES = {
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  scaleIn: 'animate-scale-in',
  slideDown: 'animate-slide-down',
  stagger1: 'animate-stagger-1',
  stagger2: 'animate-stagger-2',
  stagger3: 'animate-stagger-3',
};

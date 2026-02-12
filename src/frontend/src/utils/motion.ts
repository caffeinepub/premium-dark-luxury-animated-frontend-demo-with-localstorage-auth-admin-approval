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
  dropdownOpen: 'animate-dropdown-open',
  dropdownClose: 'animate-dropdown-close',
  modalIn: 'animate-modal-in',
  modalOut: 'animate-modal-out',
  stagger1: 'animation-delay-100',
  stagger2: 'animation-delay-200',
  stagger3: 'animation-delay-300',
};

// Navbar-specific motion constants
export const NAVBAR_MOTION = {
  hoverDuration: MOTION_DURATION,
  dropdownDuration: MOTION_DURATION,
};

// Phase 4: Micro-interactions and animations for Lighthouse Mentoring
// Smooth reveal on scroll, counter animations, and interactive elements

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Smooth scroll reveal with Intersection Observer
const observeElements = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Trigger counter animations for statistics
        const counters = entry.target.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-counter'));
          animateCounter(counter, target);
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px 0px'
  });

  elements.forEach(element => {
    observer.observe(element);
  });
};

// Testimonial carousel with autoplay and smooth transitions
class TestimonialCarousel {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('.testimonial-slide');
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.init();
  }

  init() {
    if (this.slides.length <= 1) return;

    this.createIndicators();
    this.startAutoplay();
    this.addEventListeners();
  }

  createIndicators() {
    const indicatorsContainer = this.container.querySelector('.testimonial-indicators');
    if (!indicatorsContainer) return;

    this.slides.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = `w-2 h-2 rounded-full transition-all ${
        index === 0 ? 'bg-[#00D4AA] w-8' : 'bg-white/30'
      }`;
      indicator.addEventListener('click', () => this.goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlides();
    this.updateIndicators();
    this.resetAutoplay();
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    });
  }

  updateIndicators() {
    const indicators = this.container.querySelectorAll('.testimonial-indicators button');
    indicators.forEach((indicator, index) => {
      indicator.className = `w-2 h-2 rounded-full transition-all ${
        index === this.currentIndex ? 'bg-[#00D4AA] w-8' : 'bg-white/30'
      }`;
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlides();
    this.updateIndicators();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  addEventListeners() {
    this.container.addEventListener('mouseenter', () => {
      clearInterval(this.autoplayInterval);
    });

    this.container.addEventListener('mouseleave', () => {
      this.startAutoplay();
    });
  }
}

// Enhanced button hover effects
const addButtonEffects = () => {
  const buttons = document.querySelectorAll('.btn-hover-effect');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
      e.target.style.transform = 'scale(1.05)';
      e.target.style.transition = 'transform 0.2s ease';
    });

    button.addEventListener('mouseleave', (e) => {
      e.target.style.transform = 'scale(1)';
    });
  });
};

// Card hover animations
const addCardEffects = () => {
  const cards = document.querySelectorAll('.card-hover-effect');

  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      e.target.style.transform = 'translateY(-8px)';
      e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      e.target.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', (e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '';
    });
  });
};

// Smooth scrolling for navigation links
const addSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Email capture enhancement with validation
const enhanceEmailCapture = () => {
  const emailForms = document.querySelectorAll('.email-capture-form');

  emailForms.forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');

    if (!input || !button) return;

    input.addEventListener('input', (e) => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      button.disabled = !isValid;
      button.style.opacity = isValid ? '1' : '0.5';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Add loading state
      button.innerHTML = 'Sending...';
      button.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        button.innerHTML = 'Thank you!';
        input.value = '';

        setTimeout(() => {
          button.innerHTML = 'Get Free Insights';
          button.disabled = false;
        }, 2000);
      }, 1000);
    });
  });
};

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  addButtonEffects();
  addCardEffects();
  addSmoothScroll();
  enhanceEmailCapture();

  // Initialize testimonial carousels
  document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
    new TestimonialCarousel(carousel);
  });
});

// Add CSS classes for animations
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease;
    }

    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .testimonial-carousel {
      overflow: hidden;
    }

    .testimonial-slide {
      transition: transform 0.5s ease;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-on-scroll,
      .animate-in,
      .testimonial-slide {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);
};

addAnimationStyles();
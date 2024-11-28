document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const scrollTop = document.querySelector('.scroll-top');

  if (navbar && scrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('active');
      } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('active');
      }
    });
  }

  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Single implementation of smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: 'smooth'
        });

        // Close mobile menu if open and exists
        if (navLinks) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Scroll to top functionality
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Animation for profile cards
  const observeElements = document.querySelectorAll('.profile-card');
  
  if (observeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    observeElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s ease';
      observer.observe(element);
    });
  }

  // Animation for achievement cards
  const achievementCards = document.querySelectorAll('.achievement-card');

  if (achievementCards.length > 0) {
    const achievementsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    achievementCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      achievementsObserver.observe(card);
    });
  }

  // Google Maps initialization
  function initMap() {
    if (typeof google === 'undefined' || !document.getElementById("map")) {
      console.warn('Google Maps API or map container not found');
      return;
    }

    try {
      const smkYadika = { lat: -7.0245, lng: 107.5230 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: smkYadika,
      });
      const marker = new google.maps.Marker({
        position: smkYadika,
        map: map,
      });
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
    }
  }

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Terima kasih! Pesan Anda telah terkirim.');
      this.reset();
    });
  }

  // Reveal on scroll animation
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.info-item, .form-group, .social-icon');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const revealTop = element.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);

  // Add reveal class to elements
  document.querySelectorAll('.info-item, .form-group, .social-icon').forEach(item => {
    item.classList.add('reveal');
  });

  // Form animation
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
      if (this.parentNode) {
        this.parentNode.classList.add('focus');
      }
    });
    
    input.addEventListener('blur', function() {
      if (this.parentNode && this.value === '') {
        this.parentNode.classList.remove('focus');
      }
    });
  });
});


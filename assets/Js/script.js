/*
  Portfolio Website JavaScript
  Custom JS for Prem Maheshwari's portfolio website
*/

$(document).ready(function() {
  "use strict";
  
  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(350).fadeOut('slow');
  });

  // Initialize Typed.js
  if ($('.typed-text').length) {
    new Typed('.typed-text', {
      strings: [
        "data into insights",
        "complexity into clarity",
        "numbers into narratives",
        "challenges into opportunities"
      ],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500,
      loop: true
    });
  }

  // Smooth scroll for navigation and buttons
  $('a.nav-link, .hero-buttons a, .footer-links a').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 70
      }, 800);
      
      // Close mobile menu if open
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Sticky navbar
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('navbar-shrink');
      $('#backToTop').addClass('active');
    } else {
      $('.navbar').removeClass('navbar-shrink');
      $('#backToTop').removeClass('active');
    }
    
    // Activate navigation based on scroll position
    activateNavigation();
  });

  // Back to top button
  $('#backToTop').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  // Active navigation highlight
  function activateNavigation() {
    const sections = $('section');
    const navLinks = $('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.each(function() {
      const sectionTop = $(this).offset().top - 120;
      const sectionHeight = $(this).outerHeight();
      
      if ($(window).scrollTop() >= sectionTop && $(window).scrollTop() < sectionTop + sectionHeight) {
        current = $(this).attr('id');
      }
    });
    
    navLinks.removeClass('active');
    $(`.navbar-nav .nav-link[href="#${current}"]`).addClass('active');
  }

  // Portfolio filtering
  $('.btn-filter').on('click', function() {
    $('.btn-filter').removeClass('active');
    $(this).addClass('active');
    
    const filterValue = $(this).data('filter');
    
    if (filterValue === 'all') {
      $('.portfolio-item').show(300);
    } else {
      $('.portfolio-item').hide(300);
      $(`.portfolio-item.${filterValue}`).show(300);
    }
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    loop: true,
    margin: 24,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });

  // Counter animation
  $('.counter-value').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });

  // Contact form handling
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const $form = $(this);
    const $submitButton = $form.find('button[type="submit"]');
    
    // Disable button and show loading state
    $submitButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');
    
    // Simulate form submission (replace with actual AJAX submission in production)
    setTimeout(function() {
      $('#formMessage').html('<div class="alert alert-success mt-3">Thank you! Your message has been sent successfully.</div>');
      $form[0].reset();
      $submitButton.prop('disabled', false).html('Send Message');
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        $('#formMessage').html('');
      }, 5000);
    }, 1500);
  });

  // Initialize Magnific Popup for project previews
  $('.project-demo').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  // Dashboard tabs responsive height adjustment
  function adjustDashboardHeight() {
    $('.dashboard-embed').each(function() {
      const width = $(this).width();
      const aspectRatio = $(this).data('aspect-ratio') || 0.5625;
      $(this).height(width * aspectRatio);
    });
  }
  
  // Run on load and resize
  adjustDashboardHeight();
  $(window).resize(adjustDashboardHeight);

  // Dark/Light Theme Toggle
  $('#themeToggle').on('click', function() {
    $('body').toggleClass('dark-mode');
    const isDarkMode = $('body').hasClass('dark-mode');
    
    if (isDarkMode) {
      $(this).html('<i class="fas fa-sun"></i>');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      $(this).html('<i class="fas fa-moon"></i>');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    $('body').addClass('dark-mode');
    $('#themeToggle').html('<i class="fas fa-sun"></i>');
  }

  // Initialize AOS Animation Library
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});
// GitHub-style Navigation JavaScript

$(document).ready(function() {
    "use strict";
    
    // Toggle mobile navigation
    $('#navbarToggler').on('click', function() {
      $('#mainNav').toggleClass('open');
    });
    
    // Close navigation when clicking on links (mobile)
    $('.nav-link').on('click', function() {
      if ($(window).width() < 992) {
        $('#mainNav').removeClass('open');
      }
    });
    
    // Active navigation highlight
    function setActiveLink() {
      const scrollPosition = $(window).scrollTop() + 100;
      
      $('section').each(function() {
        const currentSection = $(this);
        const sectionId = currentSection.attr('id');
        const sectionTop = currentSection.offset().top;
        const sectionHeight = currentSection.outerHeight();
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          $('.nav-link').removeClass('active');
          $(`.nav-link[href="#${sectionId}"]`).addClass('active');
        }
      });
    }
    
    // Call on page load
    setActiveLink();
    
    // Call on scroll
    $(window).on('scroll', function() {
      setActiveLink();
    });
    
    // Close navigation when clicking outside
    $(document).on('click', function(event) {
      const $navbar = $('#mainNav');
      const $navbarToggler = $('#navbarToggler');
      
      if (!$navbar.is(event.target) && 
          !$navbar.has(event.target).length && 
          !$navbarToggler.is(event.target) && 
          !$navbarToggler.has(event.target).length && 
          $navbar.hasClass('open')) {
        $navbar.removeClass('open');
      }
    });
    
    // Theme toggle functionality
    $('#themeToggle').on('click', function() {
      $('body').toggleClass('dark-mode');
      
      if ($('body').hasClass('dark-mode')) {
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
  });
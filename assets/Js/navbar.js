// Simple Fixed Navigation JavaScript

$(document).ready(function() {
    "use strict";
    
    // Mobile menu toggle
    $("#mobileMenuToggle").click(function() {
      $("#navLinks").toggleClass("open");
    });
    
    // Close mobile menu when clicking a link
    $(".nav-item").click(function() {
      $("#navLinks").removeClass("open");
    });
    
    // Close mobile menu when clicking outside
    $(document).click(function(event) {
      if (!$(event.target).closest('.simple-navbar').length) {
        $("#navLinks").removeClass("open");
      }
    });
    
    // Update active state on scroll
    $(window).scroll(function() {
      var scrollPosition = $(this).scrollTop() + 100;
      
      // Check each section's position
      $("section").each(function() {
        var sectionTop = $(this).offset().top;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var sectionId = $(this).attr("id");
        
        // If the current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // Remove active class from all links
          $(".nav-item").removeClass("active");
          
          // Add active class to the corresponding nav item
          $(".nav-item[href='#" + sectionId + "']").addClass("active");
        }
      });
    });
    
    // Initialize active state on page load
    function setInitialActive() {
      var scrollPosition = $(window).scrollTop() + 100;
      
      $("section").each(function() {
        var sectionTop = $(this).offset().top;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var sectionId = $(this).attr("id");
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          $(".nav-item").removeClass("active");
          $(".nav-item[href='#" + sectionId + "']").addClass("active");
        }
      });
    }
    
    setInitialActive();
    
    // Theme toggle
    $("#themeToggle").click(function() {
      $("body").toggleClass("dark-mode");
      
      if ($("body").hasClass("dark-mode")) {
        $(this).html('<i class="fas fa-sun"></i>');
        localStorage.setItem("darkMode", "enabled");
      } else {
        $(this).html('<i class="fas fa-moon"></i>');
        localStorage.setItem("darkMode", "disabled");
      }
    });
    
    // Check for saved theme preference
    if (localStorage.getItem("darkMode") === "enabled") {
      $("body").addClass("dark-mode");
      $("#themeToggle").html('<i class="fas fa-sun"></i>');
    }
  });
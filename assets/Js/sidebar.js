// Add this to your main.js file or create a new sidebar.js file

$(document).ready(function() {
    "use strict";
    
    // Sidebar Toggle on Mobile
    $('#sidebarToggler').on('click', function() {
        $('body').toggleClass('sidebar-open');
    });
    
    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.sidebar').length && 
            !$(e.target).closest('#sidebarToggler').length && 
            $('body').hasClass('sidebar-open')) {
            $('body').removeClass('sidebar-open');
        }
    });
    
    // Sidebar minimize/expand toggle (optional feature)
    $('.sidebar-brand').on('dblclick', function() {
        $('body').toggleClass('sidebar-collapsed');
    });
    
    // Active link highlighting
    $('.sidebar-nav .nav-link').on('click', function() {
        $('.sidebar-nav .nav-link').removeClass('active');
        $(this).addClass('active');
        
        // On mobile, close the sidebar after clicking a link
        if (window.innerWidth < 992) {
            $('body').removeClass('sidebar-open');
        }
    });
    
    // Update active link on scroll
    $(window).on('scroll', function() {
        updateActiveLink();
    });
    
    function updateActiveLink() {
        const scrollPosition = $(window).scrollTop() + 100;
        
        $('section').each(function() {
            const currentSection = $(this);
            const sectionTop = currentSection.offset().top;
            const sectionHeight = currentSection.outerHeight();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const targetId = currentSection.attr('id');
                $('.sidebar-nav .nav-link').removeClass('active');
                $(`.sidebar-nav .nav-link[href="#${targetId}"]`).addClass('active');
            }
        });
    }
    
    // Initialize correct active state on page load
    updateActiveLink();
    
    // Handle theme toggle (dark/light mode)
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
    
    // Detect screen size changes to handle sidebar state
    $(window).on('resize', function() {
        if (window.innerWidth >= 992) {
            $('body').removeClass('sidebar-open');
        }
    });
});
// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute('href'));
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Add Click Animation to Project Cards
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', () => {
      alert('You clicked on ' + project.querySelector('h3').innerText);
    });
  });
  
// Logo fade effect
document.addEventListener('DOMContentLoaded', function() {
  const logoSplash = document.getElementById('logo-splash');
  if (!logoSplash) {
    return;
  }
  
  // Wait 1.5 seconds, then start the fade
  setTimeout(function() {
    logoSplash.classList.add('fade-out');
    
    // Remove the element from DOM after fade completes
    setTimeout(function() {
      logoSplash.style.display = 'none';
    }, 1000); // Match the CSS transition duration
  }, 1500);
});

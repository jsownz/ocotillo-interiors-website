// Set active navigation state
document.addEventListener('DOMContentLoaded', function() {
  // Highlight active nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.top-nav__links a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    // Normalize paths by removing trailing slashes for comparison
    const normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
    const normalizedLink = linkPath.replace(/\/$/, '') || '/';
    
    if (normalizedCurrent === normalizedLink || 
        (normalizedCurrent !== '/' && normalizedLink !== '/' && normalizedCurrent.startsWith(normalizedLink))) {
      link.classList.add('active');
    }
  });

  // Logo fade effect
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
  }, 2000);

  logoSplash.classList.add('start');


  const carousel = document.getElementById('carousel'),
        carouselGrid = carousel.querySelector('.carousel-grid');

  if (carousel) {
    setTimeout(function(){
      let gridWidth = carouselGrid.offsetWidth,
          viewportWidth = window.innerWidth;
      carouselGrid.style.left = `-${(gridWidth/2) - (viewportWidth/2) - 32}px`;

      // Set up interval to rotate active class every 5 seconds
      setInterval(() => {
        const currentActive = carouselGrid.querySelector('.active');
        const nextActive = currentActive.nextElementSibling || carouselGrid.firstElementChild;
        
        nextActive.classList.add('active');
        currentActive.classList.remove('active');
      }, 5000);
    }, 5000);
  }

});

// Photo pile functionality
// document.addEventListener('DOMContentLoaded', function() {
//   const pile = document.querySelector('.photo-pile');
//   if (!pile) {
//     return;
//   }

//   // const nextButton = pile.querySelector('.pile-next');
//   const cards = Array.from(pile.querySelectorAll('.pile-card'));
//   const offsets = [
//     { x: 0, y: 0, r: -1 },
//     { x: -10, y: 6, r: 1.2 },
//     { x: 8, y: 14, r: -1.6 },
//     { x: -14, y: 22, r: 0.8 },
//     { x: 12, y: 30, r: -0.6 },
//     { x: -6, y: 38, r: 1.1 },
//     { x: 10, y: 46, r: -0.9 },
//     { x: -8, y: 54, r: 0.7 },
//     { x: 6, y: 62, r: -0.5 },
//     { x: -4, y: 70, r: 0.4 }
//   ];

//   let isAnimating = false;

//   function layoutPile() {
//     cards.forEach((card, index) => {
//       const offset = offsets[index] || offsets[offsets.length - 1];
//       card.style.setProperty('--pile-x', `${offset.x}px`);
//       card.style.setProperty('--pile-y', `${offset.y}px`);
//       card.style.setProperty('--pile-rot', `${offset.r}deg`);
//       card.style.zIndex = `${cards.length - index}`;
//     });
//   }

//   function advancePile() {
//     if (isAnimating) {
//       return;
//     }
//     isAnimating = true;

//     const topCard = cards.shift();
//     topCard.classList.add('is-moving');

//     setTimeout(() => {
//       topCard.classList.remove('is-moving');
//       cards.push(topCard);
//       layoutPile();
//       isAnimating = false;
//     }, 600);
//   }

//   layoutPile();

//   if (cards.length) {
//     // Run advancePile every 5 seconds
//     setInterval(advancePile, 5000);
//   }
// });

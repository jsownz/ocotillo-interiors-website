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
    const items = Array.from(carouselGrid.children);
    const gap = 32; // 2rem gap
    const itemWidths = [];
    let viewportWidth = window.innerWidth;
    let currentIndex = 0;
    let previousOffsets = new Map();
    
    // Measure all item widths after images load
    let loadedCount = 0;
    items.forEach((item, index) => {
      const img = item.querySelector('img');
      
      const measureWidth = () => {
        // Wait a frame to ensure layout is complete
        requestAnimationFrame(() => {
          itemWidths[index] = img.offsetWidth;
          console.log(`Item ${index} width: ${itemWidths[index]}px`);
          loadedCount++;
          if (loadedCount === items.length) {
            console.log('All widths measured:', itemWidths);
            initCarousel();
          }
        });
      };
      
      if (img.complete) {
        measureWidth();
      } else {
        img.addEventListener('load', measureWidth);
      }
    });
    
    function initCarousel() {
      // Find initial active index
      currentIndex = items.findIndex(item => item.classList.contains('active'));
      if (currentIndex === -1) currentIndex = 0;
      
      // Position all items
      updatePositions(false);
      
      // Start auto-rotation after delay
      setTimeout(() => {
        setInterval(() => {
          advance();
        }, 5000);
      }, 5000);
    }
    
    function updatePositions(animate = true) {
      const center = viewportWidth / 2;
      
      items.forEach((item, index) => {
        // Calculate position relative to current index
        let offset = index - currentIndex;
        
        // Handle wrapping (infinite loop effect)
        if (offset > items.length / 2) {
          offset -= items.length;
        } else if (offset < -items.length / 2) {
          offset += items.length;
        }
        
        // Check if this item is wrapping around
        const prevOffset = previousOffsets.get(index);
        const isWrapping = prevOffset !== undefined && Math.abs(offset - prevOffset) > items.length / 2;
        
        // Calculate x position (left edge of item)
        // Start from the left edge of the active/centered item
        let x = center - (itemWidths[currentIndex] / 2);
        
        // Add widths of items between active and this one
        if (offset > 0) {
          // Items to the right - walk from active to target
          for (let i = 0; i < offset; i++) {
            const idx = (currentIndex + i + items.length) % items.length;
            x += itemWidths[idx] + gap;
          }
        } else if (offset < 0) {
          // Items to the left - walk backwards from active to target
          for (let i = -1; i >= offset; i--) {
            const idx = (currentIndex + i + items.length) % items.length;
            x -= itemWidths[idx] + gap;
          }
        }
        
        // Store current offset for next comparison
        previousOffsets.set(index, offset);
        
        // Handle wrapping items
        if (isWrapping && animate) {
          // Fade out, reposition instantly, then fade in
          item.style.transition = 'opacity 0.15s ease';
          item.style.opacity = '0';
          
          setTimeout(() => {
            item.style.transition = 'none';
            item.style.transform = `translateX(${x}px)`;
            
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.3s ease';
              item.style.opacity = offset === 0 ? '1' : '0.4';
            });
          }, 150);
        } else {
          // Normal movement
          if (animate) {
            item.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease';
          } else {
            item.style.transition = 'none';
          }
          
          item.style.transform = `translateX(${x}px)`;
          item.style.opacity = offset === 0 ? '1' : '0.4';
        }
        
        // Update active class
        if (offset === 0) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    function advance() {
      currentIndex = (currentIndex + 1) % items.length;
      updatePositions(true);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        viewportWidth = window.innerWidth;
        // Re-measure widths
        items.forEach((item, index) => {
          const img = item.querySelector('img');
          itemWidths[index] = img.offsetWidth;
        });
        previousOffsets.clear();
        updatePositions(false);
      }, 100);
    });
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

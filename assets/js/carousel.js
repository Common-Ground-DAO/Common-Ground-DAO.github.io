// Media Carousel - Infinite sliding carousel with video + images

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.media-carousel');

    carousels.forEach(function(carousel) {
      const track = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prevBtn = carousel.querySelector('.carousel-btn-prev');
      const nextBtn = carousel.querySelector('.carousel-btn-next');
      const video = carousel.querySelector('video');

      if (!track || slides.length === 0) return;

      let currentIndex = 0;
      const totalSlides = slides.length;

      function goToSlide(index) {
        // Infinite loop: wrap around
        if (index < 0) {
          index = totalSlides - 1;
        } else if (index >= totalSlides) {
          index = 0;
        }

        currentIndex = index;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

        // Handle video play/pause
        if (video) {
          if (currentIndex === 0) {
            video.play();
          } else {
            video.pause();
          }
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          goToSlide(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          goToSlide(currentIndex + 1);
        });
      }

      // Keyboard navigation when carousel is hovered
      carousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          goToSlide(currentIndex + 1);
        }
      });

      // Make carousel focusable for keyboard navigation
      carousel.setAttribute('tabindex', '0');
    });
  });
})();

// ==========================================
// CAROUSEL FUNCTIONALITY
// ==========================================
let currentSlide = 0;
const cards = document.querySelectorAll('.testimonial-card');
const totalSlides = cards.length;
let slidesToShow = 1;

// Calculate slides to show based on screen width
function updateSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 1024) {
        slidesToShow = 2;
    } else {
        slidesToShow = 1;
    }
    currentSlide = 0; // Reset to first slide when resizing
}

// Create carousel indicators
function createIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    const totalIndicators = Math.ceil(totalSlides / slidesToShow);
    for (let i = 0; i < totalIndicators; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i * slidesToShow));
        indicatorsContainer.appendChild(indicator);
    }
}

// Update carousel position
function updateCarouselPosition() {
    const track = document.querySelector('.carousel-track');
    if (!track || cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 30; // including gap
    track.style.transform = `translateX(${-currentSlide * cardWidth}px)`;
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === Math.floor(currentSlide / slidesToShow));
    });
}

// Go to specific slide
function goToSlide(n) {
    const maxSlide = totalSlides - slidesToShow;
    currentSlide = Math.max(0, Math.min(n, maxSlide));
    updateCarouselPosition();
}

// Next slide
function nextSlide() {
    const maxSlide = totalSlides - slidesToShow;
    if (currentSlide < maxSlide) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateCarouselPosition();
}

// Previous slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = Math.max(0, totalSlides - slidesToShow);
    }
    updateCarouselPosition();
}

// Event listeners for carousel buttons
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Auto-rotate carousel
let autoRotateInterval;
function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        nextSlide();
    }, 8000);
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

// Initialize carousel on page load
window.addEventListener('load', () => {
    if (cards.length > 0) {
        updateSlidesToShow();
        createIndicators();
        updateCarouselPosition();
        startAutoRotate();
    }
});

// Stop auto-rotate on user interaction
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        stopAutoRotate();
        startAutoRotate();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoRotate();
        startAutoRotate();
    });
}

if (carouselContainer) {
    carouselContainer.addEventListener('click', () => {
        stopAutoRotate();
        startAutoRotate();
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    updateSlidesToShow();
    createIndicators();
    updateCarouselPosition();
});

// ==========================================
// MOBILE MENU FUNCTIONALITY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ==========================================
// FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelectorAll('input[type="text"]')[1].value,
            message: this.querySelector('textarea').value
        };

        // Validate form
        if (data.name && data.email && data.subject && data.message) {
            // Create mailto link
            const mailtoLink = `mailto:bhaswathi5@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Message prepared! Opening your email client...', 'success');
            
            // Reset form
            this.reset();
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });
}

// ==========================================
// NOTIFICATION FUNCTION
// ==========================================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and items for animation
document.querySelectorAll('.expertise-card, .timeline-item, .achievement-card, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const hasDecimal = target % 1 !== 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = hasDecimal ? current.toFixed(1) : Math.floor(current);
    }, 16);
}

// Trigger counter animation when in view
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const targetText = entry.target.textContent.trim();
            const target = parseFloat(targetText.replace(/[^0-9.]/g, ''));
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to jump to contact
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Ctrl/Cmd + / to show shortcuts (optional)
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        console.log('Keyboard Shortcuts:\nCtrl/Cmd + K: Jump to Contact\nCtrl/Cmd + /: Show this menu');
    }
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

// ==========================================
// ANIMATIONS CSS ADDITION FOR MOBILE MENU
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        padding: 20px;
        gap: 15px;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ==========================================
// PROFILE PHOTO FALLBACK
// ==========================================
const profileImg = document.getElementById('profileImg');
if (profileImg) {
    profileImg.addEventListener('load', function() {
        const container = this.closest('.profile-photo-container');
        if (container) {
            container.classList.add('has-image');
        }
    });
    
    profileImg.addEventListener('error', function() {
        const container = this.closest('.profile-photo-container');
        if (this.src.includes('profile photo.jpg')) {
            // Try .jpeg extension
            this.src = 'profile photo.jpeg';
        } else {
            // Both failed, hide image and show placeholder
            this.style.display = 'none';
            if (container) {
                container.classList.remove('has-image');
            }
        }
    });
}

console.log('✨ Portfolio website loaded successfully!');

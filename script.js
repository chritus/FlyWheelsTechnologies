document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from firing immediately
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && window.innerWidth <= 768) {
            navMenu.style.display = 'none';
            menuToggle.classList.remove('active');
        }
    });

    // Scroll-triggered animations
    const scrollAnimateElements = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve to allow re-triggering animation when scrolling back up
            }
        });
    }, observerOptions);

    scrollAnimateElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });

    // Modified parallax effect - disabled on mobile for better performance
    const heroBackground = document.querySelector('.image-hero img');
    
    function handleParallax() {
        if (window.innerWidth > 768) {
            const scrollPosition = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        } else {
            // Reset transform on mobile
            heroBackground.style.transform = 'none';
        }
    }
    
    window.addEventListener('scroll', handleParallax);

    // Newsletter Signup Animation
    const newsletterForm = document.querySelector('.newsletter-signup');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const button = newsletterForm.querySelector('button');
            
            if (emailInput.value.trim() !== '') {
                button.textContent = 'Thank You!';
                button.style.backgroundColor = '#2ecc71';
                setTimeout(() => {
                    button.textContent = 'Subscribe';
                    button.style.backgroundColor = '#3498db';
                    emailInput.value = '';
                }, 2000);
            }
        });
    }

    // Handle window resize for responsive menu
    function handleResize() {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
        } else if (!menuToggle.classList.contains('active')) {
            navMenu.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize proper display state on page load
    handleResize();
    
    // Add active menu toggle animation styles if not already in CSS
    if (!document.querySelector('#menu-toggle-style')) {
        const style = document.createElement('style');
        style.id = 'menu-toggle-style';
        style.textContent = `
            .menu-toggle.active .bar:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            .menu-toggle.active .bar:nth-child(2) {
                opacity: 0;
            }
            .menu-toggle.active .bar:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        `;
        document.head.appendChild(style);
    }
});
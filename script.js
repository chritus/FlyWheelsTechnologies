// document.addEventListener('DOMContentLoaded', () => {
//     const menuToggle = document.querySelector('.menu-toggle');
//     const navMenu = document.querySelector('.nav-menu');

//     menuToggle.addEventListener('click', () => {
//         navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        
//         // Toggle hamburger menu animation
//         menuToggle.classList.toggle('active');
//     });

//     // Close menu when clicking outside
//     document.addEventListener('click', (event) => {
//         const isClickInsideMenu = navMenu.contains(event.target);
//         const isClickOnToggle = menuToggle.contains(event.target);
        
//         if (!isClickInsideMenu && !isClickOnToggle && window.innerWidth <= 768) {
//             navMenu.style.display = 'none';
//             menuToggle.classList.remove('active');
//         }
//     });

//     // Adjust menu on window resize
//     window.addEventListener('resize', () => {
//         if (window.innerWidth > 768) {
//             navMenu.style.display = 'flex';
//         } else {
//             navMenu.style.display = 'none';
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    // Existing menu toggle code...
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        menuToggle.classList.toggle('active');
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollAnimateElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });

    // Parallax-like effect for hero background
    const heroBackground = document.querySelector('.image-hero img');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Newsletter Signup Animation
    const newsletterForm = document.querySelector('.newsletter-signup');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = newsletterForm.querySelector('button');
        button.textContent = 'Thank You!';
        button.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            button.textContent = 'Subscribe';
            button.style.backgroundColor = '#3498db';
        }, 2000);
    });

    // Adjust menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    });
});
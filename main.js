document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follower animation
    function animate() {
        let distX = mouseX - ballX;
        let distY = mouseY - ballY;

        ballX = ballX + (distX * 0.15);
        ballY = ballY + (distY * 0.15);

        follower.style.transform = `translate3d(${ballX - 16}px, ${ballY - 16}px, 0)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .bento-item, .glass, .gallery-item, .m-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = `translate3d(${ballX - 20}px, ${ballY - 20}px, 0) scale(1.5)`;
            follower.style.background = 'rgba(212, 175, 55, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = `translate3d(${ballX - 16}px, ${ballY - 16}px, 0) scale(1)`;
            follower.style.background = 'transparent';
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.bento-item, .process-card, .contact-container, .hero-content, .gallery-item, .m-card, .stat-item');
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Set Active Nav Link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Add dynamic reveal styles
const style = document.createElement('style');
style.textContent = `
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .reveal-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .bento-item:nth-child(2), .gallery-item:nth-child(2), .m-card:nth-child(2), .stat-item:nth-child(2) { transition-delay: 0.1s; }
    .bento-item:nth-child(3), .gallery-item:nth-child(3), .m-card:nth-child(3), .stat-item:nth-child(3) { transition-delay: 0.2s; }
    .bento-item:nth-child(4), .gallery-item:nth-child(4), .stat-item:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

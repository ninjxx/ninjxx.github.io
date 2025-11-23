// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or prefered scheme
const currentTheme = localStorage.getItem('theme') || 
                   (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme immediately on load
document.documentElement.setAttribute('data-theme', currentTheme);
document.body.style.transition = 'none'; // Prevent flash on load
setTimeout(() => {
    document.body.style.transition = 'background-color 0.6s ease, color 0.6s ease';
}, 100);

themeToggle.addEventListener('click', function() {
    let theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Force repaint to ensure smooth transition
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = 'block';
});

// Enhanced Intersection Observer for bidirectional animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

let lastScrollY = window.scrollY;
let scrollDirection = 'down';

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
            element.classList.add('animated');
            element.classList.remove('animate-out');
            
            // Animate skill progress bars
            if (element.classList.contains('skill-category')) {
                const skillBars = element.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.transition = 'none';
                    bar.style.transform = 'scaleX(0)';
                    setTimeout(() => {
                        bar.style.transition = 'transform 1.5s ease-out';
                        bar.style.transform = 'scaleX(1)';
                    }, 100);
                });
            }
            
            // Special handling for project cards
            if (element.classList.contains('project-card')) {
                element.classList.add('animated');
            }
        } else {
            // Only remove animation when scrolling up past element
            if (scrollDirection === 'up' && window.scrollY < entry.boundingClientRect.top) {
                element.classList.remove('animated');
                element.classList.add('animate-out');
                
                // Reset project card animations
                if (element.classList.contains('project-card')) {
                    element.classList.remove('animated');
                }
            }
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Observe project cards separately for better control
document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
});

// Track scroll direction
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;

    // Navbar and scroll-to-top button
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.querySelector('.scroll-top');
    
    if (currentScrollY > 100) {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(26, 26, 26, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        scrollTop.classList.add('active');
    } else {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'rgba(26, 26, 26, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
        scrollTop.classList.remove('active');
    }

    // Active nav link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top functionality
document.querySelector('.scroll-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        this.reset();
    });
}

// Header animation on load
window.addEventListener('load', () => {
    const headerElements = document.querySelectorAll('.header h1, .header p');
    headerElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 300));
    });
});

// Modern minimal hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('animated')) {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Add subtle parallax effect to header on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Profile photo intro animation
function initProfileAnimation() {
    const profileCard = document.querySelector('.profile-card');
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (profileCard && profilePhoto) {
        // Initial state for intro animation
        profileCard.style.opacity = '0';
        profileCard.style.transform = 'translateY(30px) scale(0.9)';
        profilePhoto.style.transform = 'scale(0.8) rotate(-10deg)';
        
        // Animate in after a delay
        setTimeout(() => {
            profileCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            profileCard.style.opacity = '1';
            profileCard.style.transform = 'translateY(0) scale(1)';
            
            profilePhoto.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s';
            profilePhoto.style.transform = 'scale(1) rotate(0deg)';
        }, 800);
    }
}

// Call this when the page loads
window.addEventListener('load', () => {
    // Your existing header animation code...
    const headerElements = document.querySelectorAll('.header h1, .header p');
    headerElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 300));
    });
    
    // Add profile animation
    initProfileAnimation();
});

// Enhanced hover effect for profile card
document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
// Mobile Menu Toggle
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');

// Add mobile menu button to navbar
const navContainer = document.querySelector('.nav-container');
if (navContainer && window.innerWidth <= 768) {
    navContainer.appendChild(mobileMenuBtn);
}

mobileMenuBtn.addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    this.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or prefered scheme
const currentTheme = localStorage.getItem('theme') || 
                   (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme immediately on load
document.documentElement.setAttribute('data-theme', currentTheme);
document.body.style.transition = 'none';
setTimeout(() => {
    document.body.style.transition = 'background-color 0.6s ease, color 0.6s ease';
}, 100);

themeToggle.addEventListener('click', function() {
    let theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Enhanced Intersection Observer for bidirectional animations
const observerOptions = {
    threshold: 0.1,
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
        } else {
            // Only remove animation when scrolling up past element
            if (scrollDirection === 'up' && window.scrollY < entry.boundingClientRect.top) {
                element.classList.remove('animated');
                element.classList.add('animate-out');
            }
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
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

// Handle window resize
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Profile photo animation
document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Profile photo animations
function initProfileAnimations() {
    const profileCard = document.querySelector('.profile-card');
    const profileImage = document.querySelector('.profile-image');
    
    if (profileCard && profileImage) {
        // Initial hidden state
        profileCard.style.opacity = '0';
        profileCard.style.transform = 'translateY(30px) scale(0.9)';
        profileImage.style.transform = 'scale(0) rotate(-180deg)';
        
        // Animate in with delay
        setTimeout(() => {
            profileCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            profileCard.style.opacity = '1';
            profileCard.style.transform = 'translateY(0) scale(1)';
            
            profileImage.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s';
            profileImage.style.transform = 'scale(1) rotate(0deg)';
        }, 800);
        
        // Add click animation
        profileImage.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Call this in your load event
window.addEventListener('load', function() {
    // Your existing header animations...
    const headerElements = document.querySelectorAll('.header h1, .header p');
    headerElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 300));
    });
    
    // Initialize profile animations
    initProfileAnimations();
});

// Enhanced hover effects
document.querySelectorAll('.profile-card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', function() {
        isHovering = true;
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        isHovering = false;
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add subtle glow effect on hover
    card.addEventListener('mousemove', function(e) {
        if (isHovering) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
            this.style.setProperty('--hover-angle', `${angle}deg`);
        }
    });
});

// Ecommerce Project Function - SIMPLE & GUARANTEED TO WORK
function openEcommerceProject() {
    // REPLACE THIS URL WITH YOUR ACTUAL ECOMMERCE WEBSITE URL
    const ecommerceUrl = 'https://ninjxx.github.io/store/'; // ⚠️ CHANGE THIS!
    
    console.log('Opening ecommerce project:', ecommerceUrl);
    
    // Add click animation
    const projectCard = document.querySelector('.ecommerce-project');
    if (projectCard) {
        projectCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            projectCard.style.transform = '';
        }, 200);
    }
    
    // Open in new tab
    window.open(ecommerceUrl, '_blank', 'noopener,noreferrer');
}

// Project Details Modal
function showProjectDetails(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    let content = '';
    
    switch(projectId) {
        case 'ecommerce':
            content = `
                <h3>E-Commerce Platform</h3>
                <p>A complete full-stack e-commerce solution built with modern technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.</p>
                
                <div class="modal-tech">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">MongoDB</span>
                    <span class="tech-tag">Express</span>
                    <span class="tech-tag">Stripe API</span>
                    <span class="tech-tag">JWT Auth</span>
                </div>
                
                <div class="modal-actions">
                    <button class="modal-btn primary" onclick="openEcommerceProject()">
                        <i class="fas fa-external-link-alt"></i>
                        View Live Demo
                    </button>
                    <button class="modal-btn secondary" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            `;
            break;
            
        case 'fitness':
            content = `
                <h3>Fitness Tracking App</h3>
                <p>Cross-platform mobile application for workout tracking, exercise planning, and fitness progress monitoring.</p>
                
                <div class="modal-tech">
                    <span class="tech-tag">React Native</span>
                    <span class="tech-tag">Firebase</span>
                    <span class="tech-tag">Redux</span>
                    <span class="tech-tag">TypeScript</span>
                </div>
                
                <div class="modal-actions">
                    <button class="modal-btn secondary" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            `;
            break;
            
        case 'analytics':
            content = `
                <h3>Analytics Dashboard</h3>
                <p>Real-time data visualization dashboard for business metrics and KPIs.</p>
                
                <div class="modal-tech">
                    <span class="tech-tag">Vue.js</span>
                    <span class="tech-tag">D3.js</span>
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">FastAPI</span>
                </div>
                
                <div class="modal-actions">
                    <button class="modal-btn secondary" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            `;
            break;
    }
    
    modalContent.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Debug helper - check if functions are working
console.log('Project functions loaded:');
console.log('- openEcommerceProject()');
console.log('- showProjectDetails()');
console.log('- closeModal()');
// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Only trigger if clicking on the card itself, not buttons
        if (!e.target.closest('.project-btn')) {
            const projectId = this.getAttribute('data-project');
            if (projectId === 'ecommerce') {
                openEcommerceProject();
            } else {
                showProjectDetails(projectId);
            }
        }
    });
});
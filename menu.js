// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add animation to menu items on scroll
    const menuItems = document.querySelectorAll('.category-card, .popular-item, .dietary-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state for menu items
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Fix for mobile viewport height
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);

    // Add hover effect for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // PDF download simulation (replace with actual PDF link)
    const pdfDownloadBtn = document.querySelector('.btn-primary[href="#"]');
    if (pdfDownloadBtn && pdfDownloadBtn.textContent.includes('Download')) {
        pdfDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show downloading message
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Downloading...';
            
            setTimeout(() => {
                // Create success message
                const downloadMessage = document.createElement('div');
                downloadMessage.innerHTML = `
                    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10000; text-align: center; max-width: 400px; width: 90%;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #eece4e; margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 1rem;">Download Started</h3>
                        <p style="margin-bottom: 1.5rem;">The menu PDF is downloading. If it doesn't start automatically, <a href="#" style="color: #eece4e; text-decoration: underline;">click here</a>.</p>
                        <button class="btn btn-primary close-download" style="margin-top: 1rem;">Close</button>
                    </div>
                `;
                
                document.body.appendChild(downloadMessage);
                
                // Add close functionality
                downloadMessage.querySelector('.close-download').addEventListener('click', () => {
                    downloadMessage.remove();
                });
                
                // Reset button text
                pdfDownloadBtn.querySelector('span').textContent = originalText;
                
                // Auto-remove message after 5 seconds
                setTimeout(() => {
                    if (downloadMessage.parentElement) {
                        downloadMessage.remove();
                    }
                }, 5000);
            }, 1000);
        });
    }
});
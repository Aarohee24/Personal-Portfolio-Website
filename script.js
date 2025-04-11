// Accordion navigation toggle
const accordionBtn = document.querySelector('.accordion-btn');
const accordionContent = document.querySelector('.accordion-content');

accordionBtn.addEventListener('click', () => {
    accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
});

// Smooth sliding transition with animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.style.transform = 'translateX(100%)';
        setTimeout(() => {
            target.style.transition = 'transform 0.7s ease';
            target.style.transform = 'translateX(0)';
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            accordionContent.style.display = 'none'; // Close accordion after click
        }, 50);
        setTimeout(() => {
            target.style.transition = '';
        }, 800);
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-btn');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .active {
        background: #3c2f2f !important;
    }
`;
document.head.appendChild(style);

// Green leaf trail effect
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '999';
canvas.style.pointerEvents = 'none';

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
        this.opacity = this.life;
    }

    draw() {
        ctx.fillStyle = `rgba(34, 139, 34, ${this.opacity})`; // Green leaf color
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size * 0.5, this.y + this.size);
        ctx.lineTo(this.x - this.size * 0.5, this.y + this.size);
        ctx.closePath();
        ctx.fill();
    }
}


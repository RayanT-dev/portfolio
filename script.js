let toastTimeout;

function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        toastMessage.textContent = message;

        toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        toast.classList.add('opacity-100', 'translate-y-0');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        }, 3000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    lucide.createIcons();

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });

    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function renderCursor() {
            cursorX += (mouseX - cursorX) * 0.8;
            cursorY += (mouseY - cursorY) * 0.8;
            cursorGlow.style.transform = `translate3d(${cursorX - 175}px, ${cursorY - 175}px, 0)`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);
    }

    const cards = document.querySelectorAll('.interactive-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            
            setTimeout(() => {
                card.style.transition = 'none';
            }, 400);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    const scrollLine = document.getElementById('scroll-line');
    if (scrollLine) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollLine.style.height = scrollPercent + '%';
        });
    }
});
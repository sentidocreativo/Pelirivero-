document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initScrollReveal();
    initLocalStorageSelector();
    initModalSystem();
});

function initProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0) {
            progressBar.style.width = ((winScroll / height) * 100) + '%';
        }
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < triggerBottom) el.classList.add('revealed');
        });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
}

function initLocalStorageSelector() {
    const selectorSection = document.getElementById('selector-negocio');
    if (!selectorSection) return;
    const chips = selectorSection.querySelectorAll('.btn-chip');
    const STORAGE_KEY = 'peli_rivero_rubro_user';
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        chips.forEach(c => { if (c.getAttribute('data-business') === saved) c.classList.add('active'); });
    }
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            localStorage.setItem(STORAGE_KEY, chip.getAttribute('data-business'));
        });
    });
}

function initModalSystem() {
    const modal = document.getElementById('premium-modal');
    const closeBtn = document.getElementById('close-modal');
    const triggers = document.querySelectorAll('.class-trigger-modal');
    if (!modal) return;
    triggers.forEach(t => t.addEventListener('click', (e) => { e.preventDefault(); modal.classList.add('open'); }));
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
}

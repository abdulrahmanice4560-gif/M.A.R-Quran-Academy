// Navbar Toggle (from previous)
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }

    // Theme toggle (dark/light)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const storedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', storedTheme);

        const updateThemeIcon = () => {
            const icon = themeToggle.querySelector('i');
            if (!icon) return;
            if (body.getAttribute('data-theme') === 'light') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        };

        updateThemeIcon();

        themeToggle.addEventListener('click', () => {
            const nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            updateThemeIcon();
        });
    }

    // Retro mode toggle
    const retroToggle = document.getElementById('retroToggle');
    if (retroToggle) {
        const storedRetro = localStorage.getItem('retro') === 'on';
        if (storedRetro) body.classList.add('retro');

        retroToggle.addEventListener('click', () => {
            body.classList.toggle('retro');
            localStorage.setItem('retro', body.classList.contains('retro') ? 'on' : 'off');
        });
    }

    // Sound toggle
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        const storedSound = localStorage.getItem('sound') !== 'off';
        window.soundEnabled = storedSound;

        const updateSoundIcon = () => {
            const icon = soundToggle.querySelector('i');
            if (!icon) return;
            icon.className = window.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        };

        updateSoundIcon();

        soundToggle.addEventListener('click', () => {
            window.soundEnabled = !window.soundEnabled;
            localStorage.setItem('sound', window.soundEnabled ? 'on' : 'off');
            updateSoundIcon();
        });
    }

    // Active page highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // Mobile menu toggle
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (navLinks && hamburger) {
        const closeMenu = () => {
            navLinks.classList.remove('is-open');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        };
        const openMenu = () => {
            navLinks.classList.add('is-open');
            hamburger.classList.add('is-active');
            hamburger.setAttribute('aria-expanded', 'true');
        };

        hamburger.addEventListener('click', event => {
            event.stopPropagation();
            if (navLinks.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.addEventListener('click', event => {
            const target = event.target.closest('a, button');
            if (target) closeMenu();
        });

        document.addEventListener('click', event => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 980) closeMenu();
        });
    }

    // Admission button fallback
    document.querySelectorAll('[data-admission-trigger]').forEach(button => {
        button.addEventListener('click', () => {
            const popup = document.getElementById('admissionPopup');
            if (popup) {
                popup.classList.add('active');
                document.body.classList.add('no-scroll');
                return;
            }
            window.location.href = 'admission.html';
        });
    });

    const toggleAdmissionPopup = isOpen => {
        const popup = document.getElementById('admissionPopup');
        if (!popup) return;
        if (isOpen) {
            popup.classList.add('active');
            document.body.classList.add('no-scroll');
        } else {
            popup.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    };

    window.openAdmissionPopup = () => toggleAdmissionPopup(true);
    window.closeAdmissionPopup = () => toggleAdmissionPopup(false);
    window.submitAdmission = event => {
        event.preventDefault();
        const form = event.target;
        if (form && form.reset) form.reset();
        toggleAdmissionPopup(false);
    };

    // Smooth scroll
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

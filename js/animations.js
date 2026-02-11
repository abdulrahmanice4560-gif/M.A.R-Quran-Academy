// Scroll Animations - Canva-style pop-ins
document.addEventListener('DOMContentLoaded', () => {
    const revealSelectors = [
        '.section-header',
        '.hero-content',
        '.feature-card',
        '.course-card',
        '.testimonial-card',
        '.policy-card',
        '.guide-card',
        '.library-card',
        '.teacher-card',
        '.faq-item',
        '.stat',
        '.cta-content',
        '.secure-portal'
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(','));
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealElements.forEach(el => observer.observe(el));
});

function initializePage(document, window) {
    const topButton = document.getElementById('backTop');
    const hero = document.getElementById('heroImg');
    const gallery = document.querySelector('.gallery');
    function updateTopButton() {
        if (topButton) topButton.hidden = (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop) <= 400;
    }
    if (topButton) {
        topButton.style.display = 'block';
        topButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        });
        window.addEventListener('scroll', updateTopButton, { passive: true });
        updateTopButton();
    }
    if (!gallery) return;
    // Content stays available without JavaScript or without animation support.
    if (!hero || typeof window.requestAnimationFrame !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (hero) hero.style.left = '34vw';
        gallery.hidden = false;
        return;
    }
    gallery.hidden = true;
    hero.style.left = '0vw';
    let startTime;
    function animate(timestamp) {
        if (startTime === undefined) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 1200, 1);
        hero.style.left = `${34 * progress}vw`;
        if (progress < 1) window.requestAnimationFrame(animate);
        else gallery.hidden = false;
    }
    window.requestAnimationFrame(animate);
}
if (typeof module !== 'undefined' && module.exports) module.exports = { initializePage };
if (typeof window !== 'undefined') initializePage(window.document, window);

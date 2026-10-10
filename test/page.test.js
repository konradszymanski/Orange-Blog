const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { initializePage } = require('../script');
function setup(reduced = false) {
    const button = { style: {}, addEventListener(name, callback) { this[name] = callback; } };
    const hero = { style: {} };
    const gallery = {};
    const frames = [];
    const document = { getElementById: id => id === 'backTop' ? button : hero,
        querySelector: () => gallery, documentElement: { scrollTop: 0 }, body: { scrollTop: 0 } };
    const window = { scrollY: 0, matchMedia: () => ({ matches: reduced }),
        requestAnimationFrame: callback => frames.push(callback),
        addEventListener(name, callback) { this[name] = callback; },
        scrollTo(options) { this.lastScroll = options; } };
    return { document, window, button, hero, gallery, frames };
}
test('gallery is revealed at animation completion independent of frame rate', () => {
    const fixture = setup();
    initializePage(fixture.document, fixture.window);
    assert.equal(fixture.gallery.hidden, true);
    fixture.frames.shift()(0);
    fixture.frames.shift()(600);
    assert.equal(fixture.hero.style.left, '17vw');
    fixture.frames.shift()(1500);
    assert.equal(fixture.hero.style.left, '34vw');
    assert.equal(fixture.gallery.hidden, false);
    assert.equal(fixture.frames.length, 0);
});
test('reduced motion reveals content immediately and scrolls without animation', () => {
    const fixture = setup(true);
    initializePage(fixture.document, fixture.window);
    assert.equal(fixture.gallery.hidden, false);
    assert.equal(fixture.hero.style.left, '34vw');
    assert.equal(fixture.frames.length, 0);
    fixture.button.click();
    assert.deepEqual(fixture.window.lastScroll, { top: 0, behavior: 'auto' });
});
test('back-to-top visibility follows the actual scroll position', () => {
    const fixture = setup();
    initializePage(fixture.document, fixture.window);
    assert.equal(fixture.button.hidden, true);
    fixture.window.scrollY = 401;
    fixture.window.scroll();
    assert.equal(fixture.button.hidden, false);
    fixture.button.click();
    assert.deepEqual(fixture.window.lastScroll, { top: 0, behavior: 'smooth' });
});
test('missing hero or animation support does not hide the gallery', () => {
    for (const missing of ['hero', 'animation']) {
        const fixture = setup();
        if (missing === 'hero') fixture.document.getElementById = id => id === 'backTop' ? fixture.button : null;
        else delete fixture.window.requestAnimationFrame;
        initializePage(fixture.document, fixture.window);
        assert.equal(fixture.gallery.hidden, false);
    }
});
test('HTML declares lazy images before parsing and keeps the hero eager', () => {
    const html = fs.readFileSync(require.resolve('../index.html'), 'utf8');
    const images = html.match(/<img\b[^>]*>/g);
    const hero = images.find(tag => tag.includes("id='heroImg'"));
    assert.match(hero, /loading="eager"/);
    for (const image of images.filter(tag => tag !== hero)) assert.match(image, /loading="lazy"/);
    assert.doesNotMatch(html, /src=""|jquery|onclick=/);
});

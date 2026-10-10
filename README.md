# Orange Blog Example

A static photo gallery built for the Generation.org programme, using Tailwind CSS and JavaScript.

[View the deployed example](https://orangeblog.netlify.app/).

## Local preview

Serve this directory with a static web server and open `index.html`.

The hero image loads eagerly. Other images use native browser lazy loading, so there is no jQuery image plugin or initialization race. The gallery remains available without JavaScript, and reduced-motion preferences skip the intro animation.

## Validation

With Node.js 18 or later, run `npm test`. The tests cover animation timing, gallery visibility, reduced motion, back-to-top behavior, and image markup.

To regenerate the existing Tailwind stylesheet, install dependencies with `npm ci`, then run `npm run build-css`.

Manual checks: reload the page, scroll through the gallery, check the Fruit section on a narrow screen, and activate Back to top using the keyboard.

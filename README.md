# Blind Mode

An overlay above the web application for the screen reader accessibility testing.

## About

One single most important thing to understand the problems the screen reader users of your
application have is to test the application from the screen reader user perspective.

This module provides an overlay, which makes no functional differences to how the application
behaves except that it covers the whole window with an overlay to bring you the idea about
how a blind person would feel the application.

## Usage

There are two ways to engage the module: as a drop-in script or as an NPM module.

Once the module is initialized, simply press `Ctrl+Shift+V` to enable the blind mode.

### Drop-in script

Simply run the following code in the browser:

```js
var blindMode = document.createElement('script');
blindMode.src = 'https://cdn.jsdelivr.net/gh/mshoho/blind-mode@master/drop-in/blind-mode.js';
document.body.appendChild(blindMode);
```

**WARNING**: This will not work if you have strict [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) rules (and you probably should have them strict). In that case you need to put
[blind-mode.js](https://raw.githubusercontent.com/mshoho/blind-mode/master/drop-in/blind-mode.js) somewhere to your application's assets and load it from there.

### NPM module

```
npm install --save-dev blind-mode
```

In the appropriate place of the application:

```
require('blind-mode').initBlindMode();
```

## Production

This is a *developer's tool*. This script contains about 600KB of base64 encoded animation and absolutely **must not be used in a production environment**.

## License
This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.

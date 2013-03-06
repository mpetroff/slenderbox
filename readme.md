# Slenderbox

## About

Slenderbox is a lightweight and framework-free lightbox script. Coming in at just 2kB minified and gzipped, it is considerably smaller than even the loading icon used by most similar scripts. In addition, by using the HTML5 data attribute, it can be used in valid HTML5.

## How to Use

1. Upload `build/slenderbox.js` and `build/slenderbox.css` to a web server.
2. Include the JavaScript file: `<script type="text/javascript" src="slenderbox.js"></script>`, using the correct path to `slenderbox.js`.
3. Include the CSS file: `<link type="text/css" rel="stylesheet" href="slenderbox.css"/>`, using the correct path to `slenderbox.css`.
4. Add `data-sbox` to image links where a lightbox is desired.
5. Add `data-sbox="REFERENCE"` with a common REFERENCE to sets of links where a lightbox gallery is desired.
6. A link's `title` becomes a caption in the lightbox.

## Examples

An example is included in the `examples` directory.

## Browser Compatibility

Since Slenderbox is built with HTML5, CSS3, and SVG, it requires a modern browser to function.

#### Full support:
* Firefox 16+
* Chrome 5+
* Safari 4.1+
* Opera 12.5+
* Internet Explorer 10+

#### Partial support:
* Firefox 3.5+
* Chrome 4+
* Opera 10.5+
* Internet Explorer 9+

## License
Slenderbox is distributed under the MIT License. For more information, read the file `COPYING` or peruse the license [online](http://www.opensource.org/licenses/MIT).

The images provided with the examples are licensed under the [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).

## Credits

* [Matthew Petroff](http://www.mpetroff.net/), Original Author

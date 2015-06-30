stylecow plugin flex
====================

[![Build Status](https://travis-ci.org/stylecow/stylecow-plugin-flex.svg)](https://travis-ci.org/stylecow/stylecow-plugin-flex)

Stylecow plugin to generate the css code with the old flexbox syntax in explorer 10 and webkit.

Note: this plugin does not add vendor prefixes to the new syntax, use [stylecow-plugin-prefixes](https://github.com/stylecow/stylecow-plugin-prefixes) to that.

More info:

* [Complete guide to flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [w3c specification](http://www.w3.org/TR/css3-flexbox/)
* [Old and new syntax](http://css-tricks.com/old-flexbox-and-new-flexbox/)

You write:

```css
body {
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	flex-direction: row;
}

p {
	flex-grow: 1;
}
```

And stylecow converts to:

```css
body {
	display: -ms-flexbox;
	display: -webkit-box;
	display: flex;
	-ms-flex-align: start;
	-webkit-box-align: start;
	align-items: flex-start;
	-ms-flex-pack: end;
	-webkit-box-pack: end;
	justify-content: flex-end;
	-ms-flex-direction: row;
	-webkit-box-orient: horizontal;
	flex-direction: row;
}
p {
	-ms-flex-positive: 1;
	-webkit-box-flex: 1;
	flex-grow: 1;
}
```

More demos in [the tests folder](https://github.com/stylecow/stylecow-plugin-flex/tree/master/tests/cases)

stylecow plugin flex
====================

Stylecow plugin to add vendor prefixes and create fallback with the old flexbox syntax in explorer 10 and webkit

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
	display: -webkit-flex;
	display: flex;
	-ms-flex-align: start;
	-webkit-box-align: start;
	-webkit-align-items: flex-start;
	align-items: flex-start;
	-ms-flex-pack: end;
	-webkit-box-pack: end;
	-webkit-justify-content: flex-end;
	justify-content: flex-end;
	-ms-flex-direction: row;
	-webkit-box-orient: horizontal;
	-webkit-flex-direction: row;
	flex-direction: row;
}
p {
	-ms-flex-positive: 1;
	-webkit-box-flex: 1;
	-webkit-flex-grow: 1;
	flex-grow: 1;
}
```

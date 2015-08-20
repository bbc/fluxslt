# fluxslt

####Description

This library is a fluent wrapper with helper functions around `xsltproc`. It comes bundled with `libxslt` on your platform, so you'll need to make sure you've got that
installed before you try running this.

####Usage

```js
var stylesheet = fs.readFileSync('path/to/my/stylesheet', 'utf-8'),
    xmlContent = fs.readFileSync('path/to/xml/doc', 'utf-8'),
    fluxslt = require('fluent-xslt');

fluxslt()
    .withStylesheet(stylesheet)
    .runOn(xmlContent)
    .then(function(transformed) {
        console.log(transformed);
    });
```

###### or

```js
var xmlContent = fs.readFileSync('path/to/xml/doc', 'utf-8'),
    fluxslt = require('fluent-xslt');

fluxslt()
    .withStylesheetPath('path/to/my/stylesheet')
    .runOn(xmlContent)
    .then(function(transformed) {
        console.log(transformed);
    });
```

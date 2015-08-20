# Fluent XSLT

#### Usage
```js
var stylesheet = fs.readFileSync('path/to/my/stylesheet', 'utf-8'),
    xmlContent = fs.readFileSync('path/to/xml/doc', 'utf-8'),
    fluxslt = require('fluent-xslt');
    
fluxslt.transform(xmlContent)
    .withStylesheet(stylesheet)
    .run()
    .then(function(transformed) {
        console.log(transformed);
    });
```

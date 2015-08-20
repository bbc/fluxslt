describe('Fluent XSLT', function() {

    var fluxslt = require('../'),
        stylesheet,
        expectedOutput,
        fs = require('fs'),
        content;

    beforeEach(function() {
        stylesheet = fs.readFileSync(__dirname + '/fixtures/stylesheet.xsl');
        content = fs.readFileSync(__dirname + '/fixtures/content.xml');
        expectedOutput = fs.readFileSync(__dirname + '/fixtures/expected.xml');
    })

    it('should throw an error when no stylesheet is supplied', function(done) {
        fluxslt()
            .run()
            .catch(function(error){
                expect(error.message).toBe('No stylesheet has been loaded.');
                done();
            });
    });

    it('should throw an error when no content is supplied', function(done) {
        fluxslt()
            .withStylesheet(stylesheet)
            .run()
            .catch(function(error){
                expect(error.message).toBe('No content has been loaded.');
                done();
            });
    });

})

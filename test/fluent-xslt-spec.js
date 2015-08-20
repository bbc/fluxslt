describe('Fluent XSLT', function() {

    var fluxslt = require('../'),
        stylesheet,
        expectedOutput,
        fs = require('fs'),
        content;

    beforeEach(function() {
        stylesheet = fs.readFileSync(__dirname + '/fixtures/stylesheet.xsl', 'utf-8');
        content = fs.readFileSync(__dirname + '/fixtures/content.xml', 'utf-8');
        expectedOutput = fs.readFileSync(__dirname + '/fixtures/expected_output.xml', 'utf-8');
    });

    it('should throw an error when no stylesheet is supplied', function(done) {
        fluxslt()
            .runOn(content)
            .catch(function(error){
                expect(error.message).toBe('No stylesheet has been loaded.');
                done();
            });
    });

    it('should throw an error when no content is supplied', function(done) {
        fluxslt()
            .withStylesheet(stylesheet)
            .runOn()
            .catch(function(error){
                expect(error.message).toBe('No content has been loaded.');
                done();
            });
    });

    it('should transform content', function(done) {
        fluxslt()
            .withStylesheet(stylesheet)
            .runOn(content)
            .then(function(transformedOutput){
                // Trim whitespace in output, don't know xslt well enough to strip all that stuff..
                expect(transformedOutput.replace(/\s/g, '')).toBe(expectedOutput.replace(/\s/g, ''));
                done();
            });
    });

    it('should transform content with a stylesheet path not raw source', function(done) {
        fluxslt()
            .withStylesheetPath(__dirname + '/fixtures/stylesheet.xsl')
            .runOn(content)
            .then(function(transformedOutput) {
                // Trim whitespace in output, don't know xslt well enough to strip all that stuff..
                expect(transformedOutput.replace(/\s/g, '')).toBe(expectedOutput.replace(/\s/g, ''));
                done();
            });
    });
});

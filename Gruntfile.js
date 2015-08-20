module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            tests: {
                spec_dir: 'test'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine');
}

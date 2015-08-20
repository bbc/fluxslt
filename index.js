var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'))
    tmp = Promise.promisifyAll(require('tmp'));

function xsltproc(stylesheetPath, untransformedContent) {
    var spawn = require('child_process').spawn;
    return new Promise(function(resolve, reject) {
        var cmd = spawn('/usr/bin/xsltproc', [stylesheetPath, '-']),
            buffer = [];

        cmd.stdout.on('data', function(data) {
            buffer.push(data);
        });

        cmd.stdout.on('close', function(code) {
            if (!code) {
                resolve(Buffer.concat(buffer).toString());
            } else {
                reject(new Error('Exited with code: ' + code));
            }
        });
        cmd.stdin.write(untransformedContent);
        cmd.stdin.end();
    });
}

function getPathForStylesheet() {
    if (this.stylesheetPath) {
        return Promise.resolve(this.stylesheetPath);
    } else {
        return tmp.dirAsync()
            .get(0)
            .bind(this)
            .then(function(path) {
                this.stylesheetPath = path + '/stylesheet.xsl';
                return fs.writeFileAsync(this.stylesheetPath, this.stylesheet, 'utf-8');
            })
            .then(function() {
                return this.stylesheetPath;
            });
    }
}

function run(resolve, reject) {
    if (!this.stylesheet && !this.stylesheetPath) {
        return reject(new Error('No stylesheet has been loaded.'));
    }

    if (!this.content) {
        return reject(new Error('No content has been loaded.'));
    }

    return getPathForStylesheet.call(this)
        .bind(this)
        .then(function(path) {
            return xsltproc(path, this.content);
        })
        .then(resolve);
}

function fluxslt() {
    return  {
        withStylesheet: function(stylesheet) {
            this.stylesheet = stylesheet;
            return this;
        },
        withStylesheetPath: function(stylesheetPath) {
            this.stylesheetPath = stylesheetPath;
            return this;
        },
        runOn: function(content) {
            this.content = content;
            return new Promise(run.bind(this));
        }
    }
}

module.exports = fluxslt;

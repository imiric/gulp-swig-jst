/**
 * User: Oliver Turner - oliver.turner@codedsignal.co.uk
 * Date: 07/02/2014
 * Time: 20:47
 */

'use strict';

var compile = require('swig').precompile;
var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-swig-jst';

module.exports = function (options) {
  var stream = through.obj(function (file, enc, cb) {
    var compiled;

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isBuffer()) {
      try {
        compiled = compile(file.contents.toString(), options).tpl.toString().replace('anonymous', '');
        file.contents = new Buffer(compiled);
      }
      catch (err) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      }

      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported.'));
      return cb();
    }

    return cb();
  });

  return stream;
};

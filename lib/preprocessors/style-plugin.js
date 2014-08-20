'use strict';

var path         = require('path');
var Plugin       = require('./plugin');
var requireLocal = require('../utilities/require-local');
var merge        = require('lodash-node/modern/objects/merge');
var mergeTrees   = require('broccoli-merge-trees');

function StylePlugin () {
  this.type = 'css';
  this._superConstructor.apply(this, arguments);
}

StylePlugin.prototype = Object.create(Plugin.prototype);
StylePlugin.prototype.constructor = StylePlugin;
StylePlugin.prototype._superConstructor = Plugin;

StylePlugin.prototype.toTree = function(tree, inputPath, outputPath, options) {
  options = merge({}, this.options, options);
  var _this = this,
      paths = options.paths || ['app'];

  var trees = paths.map(function (file) {
    var outputName = (file === 'app') ? _this.applicationName : file; // keep backwards compat
    var input = path.join(inputPath, file + '.' + _this.getExt(inputPath, file));
    var output = path.join(outputPath, outputName + '.css');

    return requireLocal(_this.name).call(null, [tree], input, output, options);
  });

  return mergeTrees(trees);
};


module.exports = StylePlugin;


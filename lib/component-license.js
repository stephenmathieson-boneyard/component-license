
var license = require('license-from-readme'),
    request = require('superagent');


/**
 * Get possible license(s) from the component at `repo#version`
 *
 * Example
 *
 *     license('stephenmathieson/rndid', '0.0.1', function (err, licenses) {
 *       if (err) throw err;
 *       console.log('licensed by', licenses.join(', '));
 *     });
 *
 * @api public
 * @param {String} repo
 * @param {String} [version]
 * @param {Function} cb
 */
exports = module.exports = function (repo, version, cb) {
  if (typeof version === 'function') {
    cb = version;
    version = 'master';
  }

  if (version === '*') {
    version = 'master';
  }


  var result = {};

  // grab the component's `component.json`
  exports.json(slug(repo, version), function (err, json) {
    if (err) return cb(err);

    var deps = json.dependencies && Object.keys(json.dependencies);

    function dependency(index) {
      var dep = deps[index];
      if (!dep) return cb(null, result);

      var version = json.dependencies[dep];

      if (version === '*') {
        version = 'master';
      }

      // find the dep's license
      exports(dep, json.dependencies[dep], function (err, l) {
        if (err) return cb(err);

        // save all licenses
        for (var prop in l) {
          if (l.hasOwnProperty(prop)) {
            result[prop] = l[prop];
          }
        }

        index++;
        dependency(index);
      });
    }

    // license in component.json?
    //   store it and start traversing deps
    if (json.license) {
      result[slug(repo, version, '#')] = [ json.license ];
      if (deps && deps.length) {
        return dependency(0);
      }

      // no deps?  just return the license
      return cb(null, result);
    }

    // grab the readme
    exports.readme(slug(repo, version, '/'), function (err, readme) {
      if (err) return cb(err);

      // parse out license info
      result[slug(repo, version, '#')] = license(readme);

      if (deps && deps.length) {
        // start traversing dependencies
        return dependency(0);
      }

      // no deps -- we're done
      cb(null, result);
    });
  });
};

/**
 * Slugify the given component information
 *
 * @api private
 * @param {String} repo
 * @param {String} version
 * @param {String} [sep] defaults to '/'
 * @return {String}
 */
function slug(repo, version, sep) {
  return [ repo, version ].join(sep || '/');
}

/**
 * Expose readme file names
 *
 * @api private
 * @type {Array}
 */
exports.readmes = [ 'readme.md', 'Readme.md', 'README.md' ];


/**
 * Get the readme file from the given `repo`
 *
 * Will attempt the following filenames:
 *
 *   - readme.md
 *   - Readme.md
 *   - README.md
 *
 * Filenames be overridden:
 *
 *     var license = require('component-license')
 *
 *     license.readmes = [ 'foo.md', 'license.md', ... ]
 *
 *     license('component/dom', function () { ... })
 *
 * @api private
 * @param {String} repo
 * @param {Function} cb
 */
exports.readme = function (repo, cb) {
  var names = exports.readmes;

  function next(index) {
    var name = names[index];
    if (!name) {
      return cb(new Error('no readme found'));
    }

    request
    .get('https://raw.github.com/' + repo + '/' + name)
    .end(function (err, res) {
      if (err) return cb(err);
      if (!res.ok) {
        index++;
        return next(index);
      }

      cb(null, res.text);
    });
  }

  next(0);
};

/**
 * Get the `component.json` file from the given `repo`
 *
 * @api private
 * @param {String} repo
 * @param {Function} cb
 */
exports.json = function (repo, cb) {
  request
  .get('https://raw.github.com/' + repo + '/component.json')
  .end(function (err, res) {
    if (err) return cb(err);
    if (!res.ok) {
      err = new Error('failed to fetch component.json, got ' + res.statusCode);
      return cb(err);
    }

    var json;
    try {
      json = JSON.parse(res.text);
    } catch (err) {
      return cb(err);
    }

    cb(null, json);
  });
};

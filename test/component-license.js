
var license = require('..');

describe('component-license', function () {

  // slooowwwww
  this.timeout(5000);

  describe('component-license(slug, version, fn)', function () {

    it('should return a component\'s licenses', function (done) {
      license('stephenmathieson/rndid', '0.0.1', function (err, licenses) {
        if (err) return done(err);
        licenses.should.be.eql({
          'stephenmathieson/rndid#0.0.1': [ 'MIT' ]
        });
        done();
      });
    });

    it('should return a component\'s dependencies licenses', function (done) {
      license('stephenmathieson/konami-code', '0.0.1', function (err, licenses) {
        if (err) return done(err);

        licenses.should.be.eql({
          'stephenmathieson/konami-code#0.0.1': [ 'MIT' ],
          // deps
          'component/event#master': [ 'MIT' ],
          'component/keyname#master': [ 'MIT' ]
        });

        done();
      });
    });

    it('should handle components with many deps', function (done) {
      this.timeout(15000);
      license('component/dom', '0.8.0', function (err, licenses) {
        if (err) return done(err);

        licenses.should.be.eql({
          'component/dom#0.8.0': [ 'MIT' ],
          'component/type#1.0.0': [ 'MIT' ],
          'component/event#0.1.0': [ 'MIT' ],
          'component/delegate#0.1.0': [ 'MIT' ],
          'component/matches-selector#master': [ 'MIT' ],
          'component/query#master': [ 'MIT' ],
          'component/event#master': [ 'MIT' ],
          'component/indexof#0.0.1': [ 'MIT' ],
          'component/domify#1.0.0': [ 'MIT' ],
          'component/classes#1.1.2': [ 'MIT' ],
          'component/indexof#master': [ 'MIT' ],
          'component/css#0.0.2': [ 'MIT' ],
          'component/sort#0.0.3': [ 'MIT' ],
          'component/value#1.1.0': [ 'MIT' ],
          'component/type#master': [ 'MIT' ],
          'component/query#0.0.1': [ 'MIT' ]
        });
        done();
      });
    });

  });
});

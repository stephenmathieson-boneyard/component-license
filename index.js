
module.exports = process.env.CL_COV
  ? require('./lib-cov/component-license')
  : require('./lib/component-license');

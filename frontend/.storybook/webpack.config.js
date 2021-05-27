const path = require('path');

module.exports = (baseConfig, env) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./'),
  ];
}

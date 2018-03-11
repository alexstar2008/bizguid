'use strict';

const env = process.env.node_env || 'dev';

module.exports = require(`./${env}`);
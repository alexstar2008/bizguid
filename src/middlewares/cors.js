const cors = require('cors');

module.exports = () => cors({ exposedHeaders: ['X-Response-Time', 'X-Total-Count'] });
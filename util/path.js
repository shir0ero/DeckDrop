const path = require('path');
//I want to export a little function that helps me to construct a path to the parent directory
module.exports = path.dirname(require.main.filename);
//importing sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'SDFG3456', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
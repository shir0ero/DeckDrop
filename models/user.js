//sequelize is an ORM library for Node.js 
const Sequelize = require('sequelize');

const sequelize = require("../util/database");
//User is a sequelize object imported from database file
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;
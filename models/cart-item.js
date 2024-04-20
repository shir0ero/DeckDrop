const Sequilize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequilize.INTEGER
});

module.exports = CartItem;

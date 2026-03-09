const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set. Configure it in your environment before starting the app.');
}

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
        keepAlive: true
      }
    : {},
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 10000,
    evict: 1000
  },
  retry: {
    max: 3
  }
});

module.exports = sequelize;

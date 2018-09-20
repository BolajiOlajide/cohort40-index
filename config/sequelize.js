import { config as getEnv } from 'dotenv';

getEnv();

const databaseUrls = {
  development: process.env.DATABASE_URL,
  staging: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  production: process.env.DATABASE_URL
};

const environment = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
const url = databaseUrls[environment];
const devMode = (environment !== 'produciton');

const config = {
  url,
  dialect,
  logging: devMode ? log => log : false,
  dialectOptions: {
    multipleStatements: true
  },
  operatorsAliases: false,
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeSeeders',
};

if (!devMode) {
  config.ssl = true;
  config.dialectOptions.ssl = {
    require: !devMode
  };
}

module.exports = config;

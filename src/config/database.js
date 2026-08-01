const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || 'med-app-dev';
const dbTestName = process.env.DB_TEST_NAME || 'med-app-test';
const dbUser = process.env.DB_USER || process.env.MYSQLUSER || 'root';
const dbPassword = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '';
const dbPort = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);

const getDbHost = () => {
    if (process.env.DB_HOST || process.env.MYSQLHOST) {
        return process.env.DB_HOST || process.env.MYSQLHOST;
    }

    if (process.env.NODE_ENV === 'kubernetes') return 'mysql-service';
    if (process.env.NODE_ENV === 'development') return 'db';
    return 'localhost';
};

const getDbConfig = () => {
    // For unit tests with SQLite
    if (process.env.NODE_ENV === 'test' && process.env.DB_TYPE === 'sqlite') {
        return {
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        };
    }
    
    // For integration tests with MySQL
    if (process.env.NODE_ENV === 'test' && process.env.DB_TYPE === 'mysql') {
        return {
            dialect: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: dbPort,
            database: dbTestName,
            username: dbUser,
            password: dbPassword,
            logging: false
        };
    }

    // Default production/development config
    return {
        dialect: 'mysql',
        host: getDbHost(),
        port: dbPort,
        database: dbName,
        username: dbUser,
        password: dbPassword,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            connectTimeout: 60000,
            socketPath: undefined,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
};

const sequelize = new Sequelize(getDbConfig());

const connectWithRetry = async (retries = 5) => {
    if (process.env.NODE_ENV === 'unit-test') {
        try {
            await sequelize.authenticate();
            console.log('Test database connected successfully');
            const models = require('../models');
            await sequelize.sync({ force: true });
            console.log('Test database synchronized');
            return;
        } catch (err) {
            console.error('Test database setup failed:', err);
            throw err;
        }
    }

    for (let i = retries; i > 0; i--) {
        try {
            await sequelize.authenticate();
            console.log('Database connected successfully');
            const models = require('../models');
            await sequelize.sync({ alter: false });
            console.log('All models synchronized with database');
            return;
        } catch (err) {
            if (i === 1) {
                console.error('Unable to connect to the database:', err);
                throw err;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

module.exports = sequelize;
module.exports.connectWithRetry = connectWithRetry;

import config from './config';

export default {
    development: {
        client: config.db.development.client,
        connection: {
            host: config.db.development.host,
            database: config.db.development.name,
            user: config.db.development.user,
            password: config.db.development.password
        },
        pool: {
            min: Number(config.db.development.min_pool) || 0,
            max: Number(config.db.development.max_pool) || 1
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds'
        }
    },

    test: {
        client: config.db.test.client,
        connection: {
            host: config.db.test.host,
            database: config.db.test.name,
            user: config.db.test.user,
            password: config.db.test.password
        },
        pool: {
            min: Number(config.db.test.min_pool) || 0,
            max: Number(config.db.test.max_pool) || 1
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds'
        }
    },
    production: {
        client: {
            host: config.db.production.host,
            database: config.db.production.name,
            user: config.db.production.user,
            password: config.db.production.password
        },
        pool: {
            min: Number(config.db.production.min_pool) || 0,
            max: Number(config.db.production.max_pool) || 1
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: __dirname + '/migrations'
        },
        seeds: {
            directory: __dirname + '/seeds'
        }
    }
};

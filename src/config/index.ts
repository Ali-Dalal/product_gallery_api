import * as dotEnv from 'dotenv';

dotEnv.config({ path: '.env' });
dotEnv.config({ path: '../.env' });

const ENV_VARS = process.env;
const config = {
    db: {
        development: {
            client: ENV_VARS.DEV_DB_CLIENT,
            host: ENV_VARS.DEV_DB_HOST,
            name: ENV_VARS.DEV_DB_NAME,
            user: ENV_VARS.DEV_DB_USER,
            password: ENV_VARS.DEV_DB_PASSWORD,
            min_pool: ENV_VARS.DEV_DB_MIN_POOL || 0,
            max_pool: ENV_VARS.DEV_DP_MAX_POOL || 2
        },
        test: {
            client: ENV_VARS.TEST_DB_CLIENT,
            host: ENV_VARS.TEST_DB_HOST,
            name: ENV_VARS.TEST_DB_NAME,
            user: ENV_VARS.TEST_DB_USER,
            password: ENV_VARS.TEST_DB_PASSWORD,
            min_pool: ENV_VARS.TEST_DB_MIN_POOL || 0,
            max_pool: ENV_VARS.TEST_DP_MAX_POOL || 2
        },
        production: {
            client: ENV_VARS.STAGING_DB_CLIENT,
            host: ENV_VARS.STAGING_DB_HOST,
            name: ENV_VARS.STAGING_DB_NAME,
            user: ENV_VARS.STAGING_DB_USER,
            password: ENV_VARS.STAGING_DB_PASSWORD,
            min_pool: ENV_VARS.PRODUCTION_DB_MIN_POOL || 0,
            max_pool: ENV_VARS.PRODUCTION_DB_MAX_POOL || 10
        },
    },
    NODE_ENV: ENV_VARS.NODE_ENV || 'development',
    PORT: ENV_VARS.PORT
};

export default config;

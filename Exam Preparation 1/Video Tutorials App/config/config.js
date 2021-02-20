const config = {
    PORT: 4000,
    DB_URI: `mongodb://localhost:27017/js-backend-exam`,
    SALT_ROUNDS: 10,
    SECRET: 'SUPERSECRET',
    COOKIE_NAME: 'TOKEN',
}

module.exports = config;
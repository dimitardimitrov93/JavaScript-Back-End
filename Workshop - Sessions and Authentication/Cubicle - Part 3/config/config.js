const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'mongodb+srv://admin:84hmH1R6wTgPHNFG@cubicles.1cipt.mongodb.net/cubicle?retryWrites=true&w=majority',
    },
};

module.exports = config[process.env.NODE_ENV.trim()];
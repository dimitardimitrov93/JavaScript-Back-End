const errorHandler = (err, req, res, next) => {
    err.status = err.status || 500;
    let message = err.message
        .slice(err.message
            .indexOf(':') + 1)
        .replace(':', '')
        .trim();

    err.message = `${message[0].toUpperCase()}${message.slice(1)}` || 'Something went wrong :(';

    console.log(err);

    res.status(err.status).render('home', { error: err });
};

module.exports = errorHandler;
const router = require('express').Router();
const courseService = require('../services/courseService');
const isAuth = require('../middlewares/isAuth');
const moment = require('moment');

router.get('/', (req, res, next) => {
    let isAuth = res.locals.isAuth;

    if (isAuth) {
        let username = res.locals.user.username;
        courseService.getAll(req.query.search)
            .then(dbCourses => {
                let courses = dbCourses.map(course => ({ ...course, createdAt: moment(course.createdAt).format('MMM Do YYYY, h:mm:ss a') }))
                res.render('home', { isAuth, username, courses });
            })
            .catch(next);

    } else {
        courseService.getAll()
            .then(dbCourses => {
                let courses = dbCourses
                    .map(course => ({ ...course, createdAt: moment(course.createdAt).format('lll') }))
                    .sort((a, b) => {
                        return b.usersEnrolled.length - a.usersEnrolled.length;
                    })
                    .slice(0, 3);

                res.render('home', { isAuth, courses });
            })
            .catch(next);
    }
});

router.get('/secret-action', isAuth, (req, res) => {
    res.send('Secret service.');
});

module.exports = router;
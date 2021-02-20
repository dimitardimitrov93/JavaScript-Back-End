const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/create', (req, res) => {
    let isAuth = res.locals.isAuth;
    if (isAuth) {
        let username = res.locals.user.username;
        res.render('createCourse', { isAuth, username });
    } else {
        res.render('createCourse', { isAuth });
    }
});

router.post('/create', (req, res, next) => {
    let { title, description, imageUrl, isPublic } = req.body;
    let courseData = {
        title,
        description,
        imageUrl,
        isPublic: Boolean(isPublic),

    }

    courseService.create(courseData, res.locals.user._id)
        .then(createdCourse => {
            res.redirect('/');
        })
        .catch(next);
});

router.get('/:courseId/details', (req, res, next) => {
    let username = res.locals.user.username;

    courseService.getOne(req.params.courseId, res.locals.user._id)
        .then(course => {
            console.log(course);

            res.render('courseDetails', { course, username });
        })
        .catch(next);
});

router.get('/:courseId/enroll', (req, res, next) => {
    courseService.enrollUser(req.params.courseId, req.user._id)
        .then(() => {
            res.redirect(`/course/${req.params.courseId}/details`);
        })
        .catch(next);
});

router.get('/:courseId/edit', (req, res, next) => {
    courseService.getOne(req.params.courseId)
        .then(course => {
            res.render('editCourse', { course });
        })
        .catch(next);
});

router.post('/:courseId/edit', (req, res, next) => {
    let { title, description, imageUrl, isPublic } = req.body;
    let courseData = {
        title,
        description,
        imageUrl,
        isPublic: Boolean(isPublic),
    }

    courseService.editCourse(courseData, req.params.courseId)
        .then(createdCourse => {
            res.redirect(`/course/${req.params.courseId}/details`);
        })
        .catch(next);
});

router.get('/:courseId/delete', (req, res, next) => {
    courseService.deleteCourse(req.params.courseId)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
});

module.exports = router;
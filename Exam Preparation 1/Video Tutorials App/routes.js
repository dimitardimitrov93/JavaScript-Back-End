const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');
const isAuth = require('./middlewares/isAuth');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/course', isAuth, courseController);

module.exports = router;
const { Router } = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const router = Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;
    try {
        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch (error) {
        res.render('login', { error })
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { message: 'Passwords mismatch!' });
    }

    try {
        let user = await authService.register({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { error });
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});

module.exports = router;
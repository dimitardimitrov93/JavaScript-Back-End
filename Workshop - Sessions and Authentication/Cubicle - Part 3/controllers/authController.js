const { Router } = require('express');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {


});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.end()
});

module.exports = router;
const { Router } = require('express');
const router = Router();
const accessoryService = require('../services/accessoryService');

// TODO Create validation MW

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', (req, res) => {
    accessoryService.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });
});

module.exports = router;
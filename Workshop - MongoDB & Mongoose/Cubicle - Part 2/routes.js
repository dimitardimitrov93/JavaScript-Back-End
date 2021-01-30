const { Router } = require('express');
const router = Router();
const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');

router.use('/products', productController);
router.use('/', homeController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;
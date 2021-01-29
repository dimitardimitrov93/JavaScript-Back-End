const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const { validateProduct } = require('./helpers/productHelpers')

router.get('/', (req, res) => {
    let products = productService.getAll();
    res.render('home', { title: 'Browse', products: { ...products } });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body, (err) => {
        if (err) {
            return res.status(500).end();
        }

        console.log('Cube saved.');
        res.redirect('/products');
    });
});

router.get('/details/:productId', (req, res) => {
    let productDetails = productService.getOne(req.params.productId);

    res.render('details', { title: 'Product Details', ...productDetails });
});

module.exports = router;
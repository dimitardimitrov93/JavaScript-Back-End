const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('./helpers/productHelpers')

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Browse', products });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body)
        .then(() => {
            console.log('Cube saved.');
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });
});

router.get('/details/:productId', (req, res) => {
    productService.getOne(req.params.productId)
        .then(productDetails => {
            console.log(productDetails);
            
            res.render('details', { title: 'Product Details', ...productDetails });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });
});

router.get('/:productId/attach-accessory', async (req, res) => {
    let productDetails = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAll();

    res.render('attachAccessory', { productDetails, accessories });
});

router.post('/:productId/attach-accessory', (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessoryId)
        .then(() => {
            res.redirect(`/products/details/${req.params.productId}`);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });

    // let productDetails = await productService.getOne(req.params.productId);
    // let accessories = await accessoryService.getAll();

    // res.render('attachAccessory', { productDetails, accessories });
});

module.exports = router;
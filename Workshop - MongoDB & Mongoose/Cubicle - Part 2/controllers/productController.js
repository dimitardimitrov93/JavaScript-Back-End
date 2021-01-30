const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
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
    // productService.create(req.body, (err) => {
    //     if (err) {
    //         return res.status(500).end();
    //     }
    // });

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

module.exports = router;
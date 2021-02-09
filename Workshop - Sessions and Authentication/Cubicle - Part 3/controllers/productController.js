const { Router } = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
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

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body, req.user._id)
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
    productService.getOneWithAccessories(req.params.productId)
        .then(productDetails => {
            res.render('details', { title: 'Product Details', ...productDetails });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });
});

router.get('/:productId/attach-accessory', isAuthenticated, async (req, res) => {
    let productDetails = await productService.getOneWithAccessories(req.params.productId);
    let accessories = await accessoryService.getAllWithout(productDetails.accessories);

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

router.get('/:productId/edit', isAuthenticated, async (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCube', product);
        });
});

router.post('/:productId/edit', isAuthenticated, validateProduct, async (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/${req.params.productId}/edit`);
        })
        .catch(error => {
            console.log(error);
        });
});

router.get('/:productId/delete', isAuthenticated, async (req, res) => {
    productService.getOne(req.params.productId)
    .then(product => {
        res.render('deleteCube', product);
    });
});

router.post('/:productId/delete', isAuthenticated, async (req, res) => {
    productService.deleteOne(req.params.productId)
        .then(response => {
            res.redirect('/products');
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
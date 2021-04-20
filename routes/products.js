const express = require('express')
const addProduct = require('../endpoints/admin/Products/addProduct.ts')

const router = express.Router()

router.get('/getProduct/:productId', (req,res) => {
    res.send('get product');
});

router.get('/getProducts', (req,res) => {
    res.send('you have no products');

    addProduct(req.body)
});

router.post('/addProduct', (req,res) => {
    let newRes = addProduct(req.body)
    res.send(newRes)
});

router.put('/updateProduct/:productId', (req,res) => {
    res.send('put product');
});

router.delete('/deleteProduct/:productId', (req,res) => {
    res.send('delete product');
});

module.exports = router;

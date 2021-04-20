var express = require('express')
var addProduct = require('../endpoints/admin/Products/addProduct.ts')
var getProduct = require('../endpoints/admin/Products/getProduct.ts')
var getProducts = require('../endpoints/admin/Products/getProducts.ts')
var updateProduct = require('../endpoints/admin/Products/updateProduct.ts')
var removeProduct = require('../endpoints/admin/Products/removeProduct.ts')
var removeProducts = require('../endpoints/admin/Products/removeProducts.ts')

const router = express.Router()

router.get('/getProduct/:productId', async(req,res) => {
    let product;
    try{
        product = await getProduct(req.params.productId);
    }catch{

    }finally{
        res.send(product);
    }
});

router.get('/getProducts', async (req,res) => {
    let products;
    try{
         product = await getProducts()
    }catch(err){

    }
    res.send(product)
});

router.post('/addProduct', async(req,res) => {
    let newProduct;
    try{
        newProduct = await addProduct(req.body);
    }catch{

    }finally{
        res.send(newProduct);
    }
    
});

router.put('/updateProduct', async(req,res) => {
    try {
        console.log(req.body)
        const result = await updateProduct(req.body)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.delete('/deleteProduct/:productId', async (req, res) => {
    try {
        const result = await removeProduct(req.params)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.delete('/deleteProducts', async (req, res) => {
    try {
        console.log(req.body)
        const result = await removeProducts(req.body)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

module.exports = router;

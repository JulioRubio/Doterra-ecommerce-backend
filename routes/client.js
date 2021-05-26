const express = require('express')
const getEvents = require('../endpoints/client/getEvents.ts')
const getEvent = require('../endpoints/admin/Events/getEvent.ts')
const getProduct = require('../endpoints/admin/Products/getProduct.ts')
const getProducts = require('../endpoints/admin/Products/getProducts.ts')
const addPedido = require('../endpoints/admin/Pedidos/addPedido.ts')


const router = express.Router()

router.get('/getEvent/:eventId', async (req, res) => {
    try {
        console.log(req.params)
        const result = await getEvent(req.params)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.get('/getEvents', async (req, res) => {
    try {
        const result = await getEvents()
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.post('/addPedido', (req, res) => {
    let newRes = addPedido(req.body)
    res.send(newRes)
});

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

module.exports = router;

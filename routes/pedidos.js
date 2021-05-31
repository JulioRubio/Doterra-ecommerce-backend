const express = require('express')
const addPedido = require('../endpoints/admin/Pedidos/addPedido.ts')
const getPedidos = require('../endpoints/admin/Pedidos/getPedidos.ts')
const getPedido = require('../endpoints/admin/Pedidos/getPedido.ts')
const updatePedido = require('../endpoints/admin/Pedidos/updatePedido.ts')
const removePedido = require('../endpoints/admin/Pedidos/removePedido.ts')
const removePedidos = require('../endpoints/admin/Pedidos/removePedidos.ts')
//const Pedidos = require('../endpoints/admin/Pedidos/Pedidos.ts')

const router = express.Router()

router.get('/getPedido/:pedidoId', async (req, res) => {
    try {
        console.log(req.params)
        const result = await getPedido(req.params)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.get('/getPedidos', async (req, res) => {
    try {
        const result = await getPedidos()
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

router.patch('/updatePedido', async (req, res) => {
    try {
        console.log(req.body)
        const result = await updatePedido(req.body)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});
/*
router.delete('/deletePedido/:pedidoId', async (req, res) => {
    try {
        console.log(req.body)
        const result = await removePedido(req.params)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.delete('/deletePedidos', async (req, res) => {
    try {
        console.log(req.body)
        const result = await removePedidos(req.body)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

module.exports = router;

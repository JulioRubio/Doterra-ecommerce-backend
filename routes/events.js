const express = require('express')
const addEvent = require('../endpoints/admin/Events/addEvent.ts')
const getEvents = require('../endpoints/admin/Events/getEvents.ts')
const getEvent = require('../endpoints/admin/Events/getEvent.ts')
const updateEvent = require('../endpoints/admin/Events/updateEvent.ts')
const Events = require('../endpoints/admin/Events/Events.ts')

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

router.post('/addEvent', (req, res) => {
    let newRes = addEvent(req.body)
    res.send(newRes)
});

router.patch('/updateEvent', async (req, res) => {
    try {
        console.log(req.body)
        const result = await updateEvent(req.body)
        res.send(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong'});
    }
});

router.delete('/deleteEvent/:eventId', (req, res) => {
    res.send('delete event');
});

module.exports = router;

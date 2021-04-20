const express = require('express')
const addEvent = require('../endpoints/admin/Events/addEvent.ts')

const router = express.Router()

router.get('/getEvent/:eventId', (req,res) => {
    res.send('get event');
});

router.get('/getEvents', (req,res) => {
    res.send('you have no events');

    addEvent(req.body)
});

router.post('/addEvent', (req,res) => {
    let newRes = addEvent(req.body)
    res.send(newRes)
});

router.put('/updateEvent/:eventId', (req,res) => {
    res.send('put event');
});

router.delete('/deleteEvent/:eventId', (req,res) => {
    res.send('delete event');
});

module.exports = router;

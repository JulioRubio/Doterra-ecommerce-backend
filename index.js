const express = require('express')

const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')

const app = express();

app.use(bodyParser.json());
const PORT = 3000;

app.use('/products', productRoutes);
app.use('/events', eventRoutes);


app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}}`);
});

app.get('/', (req,res) => {
    res.send('Hello There you dude');
});


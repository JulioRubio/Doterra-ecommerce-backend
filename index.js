const express = require('express')
const cors = require('cors')
const formidable = require('express-formidable');
const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')
const pedidoRoutes = require('./routes/pedidos')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/events', eventRoutes);
app.use('/pedidos', pedidoRoutes);

app.options('*',cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

const PORT = 3000;

app.listen(process.env.PORT || PORT,() => {
    console.log(`PORT: ${PORT}}`);
});

app.get('/', (req,res) => {
    res.send('Hello There you dude');
});


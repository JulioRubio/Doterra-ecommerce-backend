const express = require('express')
const cors = require('cors')
const corss = require('./middleware/cors');
const { DATABASE_URL, PORT, SECRET_TOKEN } = require('./config');

const middleware = require('./middleware/cors')
const validateToken = require('./middleware/validateToken');
const validateSessionToken = require('./middleware/validateSessionToken');

const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')
const pedidoRoutes = require('./routes/pedidos')
const clientRoutes = require('./routes/client')

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use(validateToken)

app.use('/products', validateSessionToken, productRoutes);
app.use('/events', validateSessionToken, eventRoutes);
app.use('/pedidos', validateSessionToken, pedidoRoutes);
app.use('/client', middleware, clientRoutes);

app.options('*',cors())
app.use(corss);


app.listen(PORT,() => {
    console.log(`PORT: ${PORT}}`);
});

app.get('/', (req,res) => {
    res.send('Hello There you dude');
});


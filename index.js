const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/events', eventRoutes);

app.options('*',cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

const PORT = 3000;




app.listen(process.env.PORT || PORT, () => {
    console.log(`http://localhost:${PORT}}`);
});

app.get('/', (req, res) => {
    res.send('Hello There you dude');
});


const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')

const app = express();

//app.options('*',cors())
app.use(bodyParser.json());
const PORT = 3000;

app.use('/products', productRoutes);
app.use('/events', eventRoutes);


app.listen(process.env.PORT || PORT,() => {
    console.log(`http://localhost:${PORT}}`);
});

app.get('/', (req,res) => {
    res.send('Hello There you dude');
});


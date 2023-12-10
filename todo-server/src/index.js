require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();

app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());

app.use(router);

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    })
})

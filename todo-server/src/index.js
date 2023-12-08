const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/router');

const app = express();

app.use(cors());
app.use(morgan('tiny'))

app.use(router);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})

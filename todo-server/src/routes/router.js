const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('todo: create todo server');
})

module.exports = router;

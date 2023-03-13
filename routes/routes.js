const express = require('express');
const router = express.Router();
const Tours = require('../services/Tours');


router.get('/', async function (req, res, next) {
    try {
        res.json(await Tours.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting tour posts `, err.message);
        next(err);
    }
});

module.exports = router;
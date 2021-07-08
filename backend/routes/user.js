const express = require('express');
const router = express.Router();

const limiter = require('../middleware/express-rate-limit-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

module.exports = router;